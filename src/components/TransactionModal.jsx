import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
import { useState } from "react";

function TransactionModal({onSubmit}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formState, setformState] = useState({
    Nama: " ",
    NomorTelepon: " ",
    Alamat: " ",
    Biaya: " ",
    Status: "Dalam Proses",
  });

  const handleChange = (e) => {
    setformState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState)
    onSubmit(formState)
  }
  // onSubmit (formState)

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  name="Nama"
                  value={formState.Nama}
                  label="Nama Pelanggan"
                  className="mb-3"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="NomorTelepon"
                  value={formState.NomorTelepon}
                  label="Nomor Telepon"
                  className="mb-3"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="Alamat"
                  value={formState.Alamat}
                  label="Alamat"
                  className="mb-3"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="Biaya"
                  value={formState.Biaya}
                  label="Biaya"
                  className="mb-3"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="Status"
                  value={formState.Status}
                  label="Status"
                  className="mb-3"
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TransactionModal