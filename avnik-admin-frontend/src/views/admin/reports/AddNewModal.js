// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  Label
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const AddNewModal = ({ open, handleModal }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>New Record</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <Label for='full-name'>Full Name</Label>
          <InputGroup>
                      <div className="input-group-append">
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </div>
            <Input id='full-name' placeholder='Bruce Wayne' />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='post'>Post</Label>
          <InputGroup>
                      <div className="input-group-append">
              <InputGroupText>
                <Briefcase size={15} />
              </InputGroupText>
            </div>
            <Input id='post' placeholder='Web Developer' />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='email'>Email</Label>
          <InputGroup>
                      <div className="input-group-append">
              <InputGroupText>
                <Mail size={15} />
              </InputGroupText>
            </div>
            <Input type='email' id='email' placeholder='brucewayne@email.com' />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='joining-date'>Joining Date</Label>
          <InputGroup>
                      <div className="input-group-append">
              <InputGroupText>
                <Calendar size={15} />
              </InputGroupText>
            </div>
            <Flatpickr className='form-control' id='joining-date' value={Picker} onChange={date => setPicker(date)} />
          </InputGroup>
        </FormGroup>
        <FormGroup className='mb-4'>
          <Label for='salary'>Salary</Label>
          <InputGroup>
                      <div className="input-group-append">
              <InputGroupText>
                <DollarSign size={15} />
              </InputGroupText>
            </div>
            <Input type='number' id='salary' />
          </InputGroup>
        </FormGroup>
        <Button className='mr-1' color='primary' onClick={handleModal}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
