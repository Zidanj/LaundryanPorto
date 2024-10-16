import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import { useState } from "react";

function TransactionModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const [formState, setformState] = useState({
    Nama : " ",
    NomorTelepon : " ",
    Alamat : " ",
    Biaya : " ",
    Status : " ",
  });
  
  const handleChange = (e) => {
    setformState({
        ...formState,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (event)=>{
    event.preventDefault();

    console.log(formState)
  }

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <Input label = "Nama Pelanggan" value={formState.Nama} onChange={handleChange}/>
                    <Input value = {formState.Nama} label = "Nama Pelanggan" className="mb-3" onChange={handleChange}/>
                    <Input value = {formState.NomorTelepon} label = "Nomor Telepon" className="mb-3" onChange={handleChange}/>
                    <Input value = {formState.Alamat} label = "Alamat" className="mb-3" onChange={handleChange}/>
                    <Input value = {formState.Biaya} label = "Biaya" className="mb-3" onChange={handleChange}/>
                    <Input onChange={handleChange} value = {formState.Status} label = "Status" className="mb-3" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}  onClick={handleSubmit}>
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