import './Button.css';

export default function Button(props){
    return (
        <button className='buttonAnimation'>
            {props.name}
        </button>
    )
}