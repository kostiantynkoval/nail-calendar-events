import React, { ChangeEvent, useContext, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import { Procedures, Technicians } from '../Dashboard'
import {Procedure} from '../../interfaces/Procedure'

type AddEventFormProps = {
    isFormOpen: boolean,
    handleClose: () => void,
    submitForm: (form: any) => void
}

export default function AddEventForm({isFormOpen, handleClose, submitForm}: AddEventFormProps) {

    const [procedure, setProcedure] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const procedures: Procedure[] = useContext(Procedures)
    const {selectedTechnician} = useContext(Technicians)
    const [filteredProcedures, setFilteredProcedures] = useState<Procedure[]>(procedures)

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        setProcedure(e.target.value)
    }

    useEffect(() => {
        const filtered = procedures.filter(procedure => selectedTechnician.procedures.includes(procedure._id))
        setFilteredProcedures(filtered)
    }, [selectedTechnician, procedures])

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      setComment(e.currentTarget.value)
    }

    function checkAndSubmitForm () {
        const procedureObj = procedures.find(item => item._id === procedure)
        if (procedureObj) {
            submitForm({
                title: procedureObj.title,
                comment,
                durationMinutes: procedureObj.durationMinutes
            })
        }
        resetStateAndClose()
    }

    const resetStateAndClose = () => {
        setProcedure('')
        setComment('')
        handleClose()
    }

    return (
            <Dialog open={isFormOpen} onClose={resetStateAndClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new procedure</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill in the form
                    </DialogContentText>
                    <TextField
                        select
                        margin="dense"
                        label="Title"
                        fullWidth
                        onChange={handleSelect}
                        value={procedure}
                    >
                        {
                            filteredProcedures.map(option => (
                                <MenuItem
                                    key={option._id}
                                    value={option._id}
                                >
                                    {option.title}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    <TextField
                        multiline
                        margin="dense"
                        name="comment"
                        label="Comment"
                        fullWidth
                        onChange={handleInput}
                        value={comment}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button disabled={!procedure} onClick={checkAndSubmitForm} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
