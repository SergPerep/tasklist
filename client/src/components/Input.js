const Input = props => {
    const { label, value, placeholder, onChange } = props;
    return <div className="input-field">
        <label>{label}</label>
        <input value={value} onChange={onChange} placeholder={placeholder}></input>
    </div>
}

export default Input;