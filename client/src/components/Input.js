const Input = props => {
    const { label, value, placeholder, onChange, autoFocus } = props;
    return <div className="input-field">
        <label>{label}</label>
        <input 
        value={value} 
        onChange={onChange} 
        autoFocus={autoFocus}
        placeholder={placeholder}></input>
    </div>
}

export default Input;