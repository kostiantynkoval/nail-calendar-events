import React, {useContext} from 'react'
import {User} from '../../App'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './Header.scss'



const Index = () => {

    const {user, updateUser} = useContext(User)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [anchorFm, setAnchorFm] = React.useState<null | HTMLElement>(null)

    const isMenuOpen = Boolean(anchorEl)
    const isFormOpen = Boolean(anchorFm)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const openLoginForm = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorFm(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleFormClose = () => {
        setAnchorFm(null)
    }

    const menuId = 'primary-search-account-menu'
    const formId = 'primary-search-account-form'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    )

    const renderForm = (
        <Menu
            anchorEl={anchorFm}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={formId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isFormOpen}
            onClose={handleFormClose}
        >
            <form autoComplete="off">
                <div>
                    <TextField error id="standard-error" label="Error" defaultValue="Hello World" />
                    <TextField
                        error
                        id="standard-error-helper-text"
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Incorrect entry."
                    />
                    <Button type="submit">Login</Button>
                </div>
            </form>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    )

    return (
        <div className='grow'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className='menu-button'
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography className='title' variant="h6" noWrap>
                        Nails Events Calendar
                    </Typography>
                    <div className='grow'/>
                    <div className='section-desktop'>

                            {
                                !!user ? (
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <Avatar>WW</Avatar>
                                    </IconButton>
                                ) : (
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={formId}
                                        aria-haspopup="true"
                                        onClick={openLoginForm}
                                        color="inherit"
                                    >
                                        <AccountCircle fontSize={'large'}/>
                                    </IconButton>
                                )
                            }
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {renderForm}
        </div>
    )
}

export default Index
