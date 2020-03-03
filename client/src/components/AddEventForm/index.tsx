import React, { ChangeEvent, useContext, useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type AddEventFormProps = {
    isFormOpen: boolean,
    handleClose: () => void,
    submitForm: (form: any) => void
}

export default function AddEventForm({isFormOpen, handleClose, submitForm}: AddEventFormProps) {

    const [title, setTitle] = useState<string>('')
    const [durationMinutes, setDurationMinutes] = useState<string>('')
    const [comment, setComment] = useState<string>('')

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.currentTarget.name) {
            case 'title':
                setTitle(e.currentTarget.value)
                break
            case 'durationMinutes':
                setDurationMinutes(e.currentTarget.value)
                break
            case 'comment':
                setComment(e.currentTarget.value)
                break
            default:
                console.log('Wrong target name')
        }
    }

    function checkAndSubmitForm () {
        submitForm({
            title,
            comment,
            durationMinutes
        })
        resetStateAndClose()
    }

    const resetStateAndClose = () => {
        setTitle('')
        setDurationMinutes('')
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
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        fullWidth
                        onChange={handleInput}
                        value={title}
                    />
                    <TextField
                        margin="dense"
                        name="durationMinutes"
                        label="Duration (in minutes)"
                        fullWidth
                        onChange={handleInput}
                        value={durationMinutes}
                    />
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
                    <Button disabled={!title || !durationMinutes} onClick={checkAndSubmitForm} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
    );
}
