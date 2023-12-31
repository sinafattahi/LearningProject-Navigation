import React,{useState, useEffect, useRef} from "react";

const Dropdown = ({options, selected, onSelectedChange, label}) => {

    const [open, setOpen] = useState(false);
    const ref = useRef();

    const onBodyClick = (event)=> {
        if(ref.current != null){
            if(ref.current.contains(event.target)){
                return;
            }else{
                setOpen(false);
            }
        }   
    }

    useEffect(() => {
        document.body.addEventListener('click', onBodyClick);

        return () => {
            document.body.removeEventListener('click', onBodyClick);   //for toggeling dropdown in where it use and removing it
        }

    },[]);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value){
            return null;
        }
        return(
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        );
    });
    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active': ''}`}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? 'visible transition' : ''}`}>{renderedOptions}</div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;