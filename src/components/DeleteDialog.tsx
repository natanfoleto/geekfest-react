import { Dialog } from "primereact/dialog";

import { X, Check } from "phosphor-react";

import styles from "./DeleteDialog.module.css";

interface DeleteDialogProps {
  isOpen?: boolean;
  title: string;
  lore?: string;
  subject?: string;
  onHide: () => void;
  onDelete: () => void;
}

export function DeleteDialog({
  isOpen,
  title,
  lore,
  subject = "",
  onHide,
  onDelete,
}: DeleteDialogProps) {
  const deleteUserFooter = (
    <div className="flex justify-end">
      <button className="flex gap-1 outline-0 border-0 w-24 p-4 font-bold rounded cursor-pointer text-purple-300 bg-white hover:bg-purple-300 hover:text-white disabled:cursor-not-allowed opacity-50 " onClick={onHide}>
        <X size={18} weight="fill" /> Não
      </button>

      <button className="flex gap-1 outline-0 border-0 w-24 p-4 font-bold rounded cursor-pointer text-purple-300 bg-white hover:bg-purple-300 hover:text-white disabled:cursor-not-allowed opacity-50  " onClick={onDelete}>
        <Check size={18} weight="fill" /> Sim
      </button>
    </div>
  );

  return (
    <Dialog
      modal
      visible={isOpen}
      header={title}
      onHide={onHide}
      footer={deleteUserFooter}
      style={{ margin: "1rem" }}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />

        <span>
          {lore ? (
            <p>
              {lore}
              <b>{subject}</b>?
            </p>
          ) : (
            <p>
              Deseja mesmo excluir o registro <b>{subject}</b>?
            </p>
          )}
        </span>
      </div>
    </Dialog>
  );
}
