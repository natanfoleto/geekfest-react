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

import { PermissionGate } from "./PermissionGate";
import { DeleteDialog } from "./DeleteDialog";

import {
  findAllAttractions,
  IAttraction,
  createAttraction,
  updateAttraction,
  deleteAttraction,
} from "../services/attraction";

import styles from "./Tab.module.css";

export function TabAttraciton() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  const [attractions, setAttractions] = useState<IAttraction[]>();
  const [selectedAttraction, setSelectedAttraction] =
    useState<IAttraction | null>(null);

  const [lastLoadTime, setLastLoadTime] = useState(new Date());
  const [attractionDialog, setAttractionDialog] = useState(false);
  const [deleteAttractionDialog, setDeleteAttractionDialog] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    description: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
    banner_url: {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  useEffect(() => {
    async function findSetAllAttractions() {
      const { status, message, data } = await findAllAttractions();

      if (status === "error") toast.error(message);
      if (status === "success") setAttractions(data);
    }

    findSetAllAttractions();
  }, [lastLoadTime]);

  function add() {
    clearForm();
    setSelectedAttraction(null);
    setAttractionDialog(true);
  }

  function edit() {
    setAttractionDialog(true);
  }

  function del() {
    setDeleteAttractionDialog(true);
  }

  async function handleSubmitAdd(event: FormEvent) {
    event.preventDefault();

    const { status, message } = await createAttraction({
      name,
      description,
      bannerUrl,
    });

    if (status === "success") toast.success(message);
    if (status === "error") toast.error(message);

    clearForm();
    hideDialog();
    setLastLoadTime(new Date());
  }

  async function handleSubmitEdit(event: FormEvent) {
    event.preventDefault();

    const id = selectedAttraction?.id;

    if (id) {
      const { status, message } = await updateAttraction({
        id,
        name,
        description,
        bannerUrl,
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
    const id = selectedAttraction?.id;

    if (id) {
      const { status, message } = await deleteAttraction({ id });

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

  function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setDescription(event.target.value);
  }

  function handleBannerUrlChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setBannerUrl(event.target.value);
  }

  function selectAttraction(e: DataTableSelectionChangeParams) {
    const { value } = e;

    setSelectedAttraction(value);
    setName(value.name);
    setDescription(value.description);
    setBannerUrl(value.banner_url);
  }

  function unselectAttraction() {
    if (selectedAttraction) clearState();
  }

  function clearForm() {
    setName("");
    setDescription("");
    setBannerUrl("");
  }

  function clearState() {
    clearForm();
    setSelectedAttraction(null);
  }

  function onGlobalFilterChange(e: any) {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  }

  function hideDialog() {
    setAttractionDialog(false);
    setDeleteAttractionDialog(false);
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
      description: {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      banner_url: {
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
          <button disabled={selectedAttraction === null} onClick={edit}>
            <PencilLine size={22} weight="fill" />
          </button>
          <button disabled={selectedAttraction === null} onClick={del}>
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
    <PermissionGate permissions={["manage-games"]}>
      <DataTable
        value={attractions}
        header={header}
        filters={filters}
        size="small"
        filterDisplay="row"
        globalFilterFields={["id", "name", "description", "banner_url"]}
        selection={selectedAttraction}
        onSelectionChange={(e) => selectAttraction(e)}
        onRowClick={unselectAttraction}
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
        emptyMessage="Nenhuma atraçãp encontrada."
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
          style={{ width: "30%" }}
          sortable
        />
        <Column
          key="description"
          field="description"
          header="Descrição"
          style={{ width: "25%" }}
          sortable
        />
        <Column
          key="banner_url"
          field="banner_url"
          header="URL do Banner"
          style={{ width: "30%" }}
        />
      </DataTable>

      <Dialog
        visible={attractionDialog}
        style={{ minWidth: "500px" }}
        header={selectedAttraction ? "Editando Atração" : "Nova Atração"}
        modal
        onHide={hideDialog}
      >
        <form
          onSubmit={selectedAttraction ? handleSubmitEdit : handleSubmitAdd}
          className={styles.form}
        >
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className={styles.input}
            placeholder="Nome da atração"
            required
          />

          <input
            name="description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            className={styles.input}
            placeholder="Descrição da atração"
            required
          />

          <input
            name="bannerUrl"
            type="text"
            value={bannerUrl}
            className={styles.input}
            onChange={handleBannerUrlChange}
            placeholder="Link da imagem do banner"
            required
          />

          <div className={styles.bannerPreview}>
            <p>Pré visualização do banner</p>
            <img
              src={
                bannerUrl ||
                "https://img.icons8.com/ios-filled/512/no-image.png"
              }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://img.icons8.com/ios-filled/512/no-image.png";
              }}
              alt="Pré-visualização"
            />
          </div>

          <div className={styles.subimitDialog}>
            <button type="button" onClick={hideDialog}>
              Cancelar
            </button>

            <button type="submit">Salvar</button>
          </div>
        </form>
      </Dialog>

      <DeleteDialog
        isOpen={deleteAttractionDialog}
        title="Deletar Atração?"
        subject={selectedAttraction?.name}
        onHide={hideDialog}
        onDelete={handleSubmitDelete}
      />
    </PermissionGate>
  );
}
