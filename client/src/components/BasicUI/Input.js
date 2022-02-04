const Input = props => {
    const { label, name, value, placeholder, onChange, autoFocus, type = "text" } = props;
    return <div className="input-field">
        <label>{label}</label>
        <input 
        type={type}
        name={name}
        value={value} 
        onChange={onChange} 
        autoFocus={autoFocus}
        placeholder={placeholder}></input>
    </div>
}

export default Input;