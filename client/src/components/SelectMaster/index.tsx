import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    circle: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    }
});

export default function CustomizedMenus() {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div style={{ marginBottom: 16 }}>
            <Typography variant="h6" component="h4">Choose your master</Typography>
            <MenuItem
                onClick={handleClick}
            >
                <ListItemIcon>
                    <Avatar
                        classes={{circle: classes.circle}}
                        alt="Remy Sharp"
                    >MK</Avatar>
                </ListItemIcon>
                <ListItemText primary="Sent mail Sent mail Sent mail"/>
            </MenuItem>
            <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp">AA</Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Sent mail Sent mail Sent mail"/>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp">MK</Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Sent mail Sent mail Sent mail"/>
                </MenuItem>
            </Menu>
        </div>
    )
}
