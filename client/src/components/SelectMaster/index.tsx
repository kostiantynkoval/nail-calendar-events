import React, { useContext, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Technician } from '../../interfaces/Technician'
import { Technicians } from '../Dashboard'

const useStyles = makeStyles({
    circle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    }
})

const getPersonAvatar = (person: Technician): string => {
    const secondChar = person.lastName ? person.lastName.charAt(0) : ''
    return person.firstName.charAt(0) + secondChar
}

const getPersonName = (person: Technician): string => {
    const lastName = person.lastName ? ` ${person.lastName}` : ''
    return person.firstName + lastName
}

export default function CustomizedMenus() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const {
        technicians,
        selectedTechnician,
        selectTechnician
    } = useContext(Technicians)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const setTechician = (technician: Technician) => {
        selectTechnician(technician)
        handleClose()
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div style={{ marginBottom: 16 }}>
            <Typography variant="h6" component="h4">Choose your technician</Typography>
            <MenuItem
                onClick={handleClick}
            >
                <ListItemIcon>
                    <Avatar
                        classes={{ circle: classes.circle }}
                        alt="Remy Sharp"
                    >{getPersonAvatar(selectedTechnician)}</Avatar>
                </ListItemIcon>
                <ListItemText primary={getPersonName(selectedTechnician)}/>
            </MenuItem>
            <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    technicians.map(technician => (
                        <MenuItem
                            onClick={() => setTechician(technician)}
                            key={technician._id}
                        >
                            <ListItemIcon>
                                <Avatar
                                    alt={getPersonName(technician)}
                                >{getPersonAvatar(technician)}</Avatar>
                            </ListItemIcon>
                            <ListItemText primary={getPersonName(technician)}/>
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
}
