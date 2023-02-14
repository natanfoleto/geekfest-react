import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Plus, PencilLine, Trash } from "phosphor-react";

import {
  DataTable,
  DataTableSelectionChangeParams,
} from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

import { PermissionGate } from "../components/PermissionGate";
import { DeleteDialog } from "./DeleteDialog";

import {
  findAllQuests,
  IQuest,
  createQuest,
  updateQuest,
  deleteQuest,
} from "../services/quest";

import styles from "./Tab.module.css";

export function TabQuest() {
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [amount, setAmount] = useState(0);
  const [quests, setQuests] = useState<IQuest[]>();
  const [selectedQuest, setSelectedQuest] = useState<IQuest | null>(null);

  const [lastLoadTime, setLastLoadTime] = useState(new Date());
  const [questDialog, setQuestDialog] = useState(false);
  const [deleteQuestDialog, setDeleteQuestDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    objective: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    amount: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  useEffect(() => {
    async function findSetAllQuests() {
      const { status, message, data } = await findAllQuests();

      if (status === "error") toast.error(message);
      if (status === "success") setQuests(data);
    }

    findSetAllQuests();
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedQuest(null);
    setQuestDialog(true);
  }

  function edit() {
    setQuestDialog(true);
  }

  function del() {
    setDeleteQuestDialog(true);
  }

  async function handleSubmitAdd(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await createQuest({
      name,
      objective,
      amount,
    });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);

    clearForm();
    hideDialog();
    setLastLoadTime(new Date());
  }

  async function handleSubmitEdit(event: FormEvent) {
    event.preventDefault();

    const id = selectedQuest?.id;

    if (id) {
      const { status, message } = await updateQuest({
        id,
        name,
        objective,
        amount,
      });

      if (status === "error") toast.error(message);
      if (status === "success") {
        toast.success(message);
      }

      clearState();
      hideDialog();
      setLastLoadTime(new Date());
    }
  }

  async function handleSubmitDelete() {
    const id = selectedQuest?.id;

    if (id) {
      const { status, message } = await deleteQuest({ id });

      if (status === "success") toast.success(message);
      if (status === "error") toast.error(message);

      clearState();
      hideDialog();
      setLastLoadTime(new Date());
    }
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setName(event.target.value);
  }

  function handleObjectiveChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setObjective(event.target.value);
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setAmount(Number(event.target.value));
  }

  function selectQuest(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedQuest(value);
    setName(value.name);
  }

  function unselectQuest() {
    if (selectedQuest) clearState();
  }

  function clearForm() {
    setName("");
  }

  function clearState() {
    clearForm();
    setSelectedQuest(null);
  }

  function onGlobalFilterChange(e: any) {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  function hideDialog() {
    setQuestDialog(false);
    setDeleteQuestDialog(false);
  }

  function initFilters() {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: {
        value: null,
        matchMode: FilterMatchMode.EQUALS,
      },
      name: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      objective: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      amount: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
    });

    setGlobalFilterValue("");
  }

  const header = () => {
    return (
      <div className="flex justify-content-between">
        <div className={styles.buttons}>
          <button onClick={add}>
            <Plus size={22} weight="bold" />
          </button>
          <button disabled={selectedQuest === null} onClick={edit}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={selectedQuest === null} onClick={del}>
            <Trash size={22} weight="fill" />
          </button>
        </div>

        <div className="flex gap-1">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            onClick={initFilters}
          />

          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar"
            />
          </span>
        </div>
      </div>
    );
  };

  const paginatorLeft = (
    <span>
      Tabela atualizada às {lastLoadTime.getHours()}h
      {lastLoadTime.getMinutes() > 9
        ? lastLoadTime.getMinutes()
        : `0${lastLoadTime.getMinutes()}`}
      m
      {lastLoadTime.getSeconds() > 9
        ? lastLoadTime.getSeconds()
        : `0${lastLoadTime.getSeconds()}`}
      s
    </span>
  );
  const paginatorRight = (
    <Button
      type="button"
      icon="pi pi-refresh"
      className="p-button-text"
      onClick={clearState}
    />
  );

  return (
    <PermissionGate permissions={["manage-quests"]}>
      <DataTable
        value={quests}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "objective", "amount"]}
        selection={selectedQuest}
        onSelectionChange={(e) => selectQuest(e)}
        onRowClick={unselectQuest}
        selectionMode="single"
        paginator
        rows={15}
        rowsPerPageOptions={[15]}
        responsiveLayout="scroll"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
        resizableColumns
        columnResizeMode="fit"
        emptyMessage="Nenhuma missão encontrada."
      >
        <Column
          key="id"
          field="id"
          header="ID"
          style={{ width: "5%" }}
          sortable
        />
        <Column
          key="name"
          field="name"
          header="Nome"
          style={{ width: "25%" }}
          sortable
        />
        <Column
          key="objective"
          field="objective"
          header="Objetivo"
          style={{ width: "40%" }}
          sortable
        />
        <Column
          key="amount"
          field="amount"
          header="Quantidade"
          style={{ width: "30%" }}
        />
      </DataTable>

      <Dialog
        visible={questDialog}
        style={{ minWidth: "450px" }}
        header={selectedQuest ? "Editando Missão" : "Nova Missão"}
        modal
        onHide={hideDialog}
      >
        <form
          onSubmit={selectedQuest ? handleSubmitEdit : handleSubmitAdd}
          className={styles.form}
        >
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome da missão"
            required
          />

          <input
            name="objective"
            type="text"
            value={objective}
            onChange={handleObjectiveChange}
            className={styles.input}
            placeholder="Objetivo da missão"
            required
          />

          <label>Quantidade de insígnias</label>
          <input
            name="amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className={styles.input}
            placeholder="Quantidade de insígnias"
            required
          />

          <div className={styles.subimitDialog}>
            <button type="button" onClick={hideDialog}>
              Cancelar
            </button>

            <button type="submit">Salvar</button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        isOpen={deleteQuestDialog}
        title="Deletar Missão?"
        subject={selectedQuest?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDelete}
      />
    </PermissionGate>
  );
}
