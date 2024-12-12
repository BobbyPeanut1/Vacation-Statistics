import css from "./Login.module.css";
import { useState } from "react";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/userService";
import { notify } from "../../../Utils/Notify";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';


export function Login(): JSX.Element {
    const [credentials, setCredentials] = useState<CredentialsModel>(new CredentialsModel("", ""));

async function submit(e: any) {
    try{
        e.preventDefault();
        await userService.login(credentials);
        window.location.href = '/';
    }
    catch(err: any){
        if (err.status === 400){
            notify.error("Your login credentials are wrong, please try again");
        }
        else{
            notify.error("An unexpected error has occurred, please try again later")
        }
    }
         

    }

    return (
        <div className={css.loginFormWrapper}>
            <div className={css.backgroundApply}>
                <Form onSubmit={submit}>
                <h1 className={css.formHeader}>
                    Sign in
                </h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <div className={css.emailInputSize}>
                    <EmailIcon />
                    <Form.Label><span className={css.emailMove}>Email address</span></Form.Label>
                </div>
                
                <Form.Control type="email"
                placeholder="Enter email"
                value={credentials.email ? credentials.email : ""}
                onChange={e => setCredentials({...credentials, email: e.target.value})}
                required
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                <div className={css.passwordInputSize}>
                    <LockIcon />
                    <Form.Label><span className={css.emailMove}>Password</span></Form.Label>
                </div>
                    <Form.Control type="password"
                    placeholder="Enter password"
                    value={credentials.password ? credentials.password : ""}
                    onChange={e => setCredentials({...credentials, password: e.target.value})}
                    required 
                    />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </div>
            
        </div>
    );
}
