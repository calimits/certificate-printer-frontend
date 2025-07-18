import "./DialogueWindow.css"

const DialogueWindow = ({question, handleClickBtnYes, handleClickBtnNo}) => {
    return(
        <div className="dialogue-window">
            <h5 className="padding-1rem">{question}</h5>
            <div className="flex-buttons">
                <button type="button" className="btn btn-primary"
                        onClick={handleClickBtnYes}>Yes</button>
                <button type="button" className="btn btn-primary"
                        onClick={handleClickBtnNo}>No</button>
            </div>
        </div>
    )
}


export {DialogueWindow};