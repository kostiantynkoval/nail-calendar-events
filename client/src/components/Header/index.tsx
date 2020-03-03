import React, { useContext, useState, ChangeEvent } from 'react'
import { User } from '../../App'
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
import './Header.scss'

const Header = () => {

    const { user, updateUser } = useContext(User)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [anchorFm, setAnchorFm] = useState<null | HTMLElement>(null)
    const [email, setEmail] = useState<string>('qq@qq.qq')
    const [password, setPassword] = useState<string>('qqqqqqqq')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

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

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.currentTarget.name) {
            case 'password':
                setPasswordError('')
                setPassword(e.currentTarget.value)
                break
            case 'email':
                setEmailError('')
                setEmail(e.currentTarget.value)
                break
            default:
                console.log('Wrong target name')
        }
    }

    const loginUser = () => {
        if(!email) {
            setEmailError('Email is empty or not valid')
            return
        }
        if(!password) {
            setPasswordError('Password is empty or not valid')
            return
        }
        return fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res => res.json())
            .then(value => {
                if(!!value.token) {
                    console.log('VALUE', value)
                    localStorage.setItem('token', value.token)
                    localStorage.setItem('userId', value.userId)
                    localStorage.setItem('initials', value.initials)
                    updateUser(value)
                    handleFormClose()
                    setPassword('')
                    setEmail('')
                }
            })
            .catch(err => {console.error('Login Error', err)})
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('initials')
        updateUser(null)
        handleMenuClose()
        setPassword('')
        setEmail('')
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
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
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
            <div className="form-login">
                <TextField
                    error={Boolean(emailError)}
                    name="email"
                    label="Email"
                    helperText={emailError}
                    value={email}
                    onChange={handleInput}
                />
                <TextField
                    error={Boolean(passwordError)}
                    name="password"
                    label="Password"
                    helperText={passwordError}
                    value={password}
                    onChange={handleInput}
                />
                <Button onClick={() => loginUser()} disabled={!email || !password || !!passwordError || !!emailError}>Login</Button>
            </div>

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
                                    <Avatar>{user?.initials}</Avatar>
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
                                    <Avatar/>
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

export default Header
