import "./InputForm.css";

const InputForm = ({id, placeholder, type, required, disabled=false, className = {div: "input-form mb-3", input:  "form-control"}, 
                    handleChange, handleBlur, defaultValue}) => {
    return (
        <div className={className.div}>
            <input onChange={handleChange} onBlur={handleBlur} 
                    type={type} required={required} 
                    placeholder={placeholder} className={className.input} 
                    id={id} aria-describedby ="emailHelp" 
                    disabled={disabled} defaultValue={defaultValue}/>
        </div>
    )
}

export {InputForm};