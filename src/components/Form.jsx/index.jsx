import "./Form.css";

const Form = ({children, method, handleSubmit, className}) => {
    return (
        <form onSubmit={handleSubmit} className={className} method={method}>
            {children}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export { Form };