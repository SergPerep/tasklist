const Input = props => {
    const { label, name, value, placeholder, onChange, autoFocus, type = "text", maxLength, minLength } = props;
    return <div className="input-field">
        <label>{label}</label>
        <input 
        type={type}
        name={name}
        value={value} 
        onChange={onChange} 
        autoFocus={autoFocus}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder} />
    </div>
}

export default Input;