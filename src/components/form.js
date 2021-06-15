import PropTypes from 'prop-types';

const Form = (props) => (
    <div>
        <h1>Inicio de Sesion</h1>
        <div>
            <input type="email" value={props.email} onChange={props.changeEmail} placeholder="Correo Electronico..."/>
            <input type="password" value={props.password} onChange={props.changePassword} placeholder="Contraseña..." />
            <button type="submit" onClick={props.login} disabled={!props.isFormValid} >Enviar</button>
        </div>
    </div>
)

Form.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    changeEmail: PropTypes.func,
    changePassword: PropTypes.func,
    login: PropTypes.func,
    isFormValid: PropTypes.bool,
};

Form.defaultProps = {
    email: '',
    password:  '',
    changeEmail: () => {},
    changePassword:  () => {},
    login:  () => {},
    isFormValid: false,
};

export default Form;
