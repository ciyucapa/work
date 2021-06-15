import PropTypes from 'prop-types';

const Quote = (props) => (
    <div>
        <div>
            Valor a ENVIAR en CLP
            <input type="number" value={props.sendAmount} onChange={props.changeSendAmount}/>
        </div>
        <div>
            Valor a RECIBIR en BTC
            <input type="number" value={props.reviceAmount} onChange={props.changeReviceAmount}/>
        </div>
        <div>
            El precio de 1 BTC es {props.price}
        </div>
    </div>
);

Quote.propTypes = {
    price: PropTypes.number,
    sendAmount: PropTypes.number,
    reviceAmount: PropTypes.number,
    changeSendAmount: PropTypes.func,
    changeReviceAmount: PropTypes.func,
};

Quote.defaultProps = {
    price: 0,
    sendAmount:  0,
    reviceAmount:  0,
    changeSendAmount: () => {},
    changeReviceAmount: () => {},
};

export default Quote;
