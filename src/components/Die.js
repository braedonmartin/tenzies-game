import './Die.css';

export default function Die(props) {
  // If the die is selected, make it green, otherwise make it white
  const styles = {
    backgroundColor: props.selected ? "#59E391" : "#FFFFFF"
  }

  return (
    <div
    style={styles}
    className='die' 
    onClick={() => props.toggle(props.id)}
    >{props.value}
    </div>
  );
}