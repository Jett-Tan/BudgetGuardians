import FontAwesomeIcon  from '@expo/vector-icons/FontAwesome6';

export default function FaIcon({ size, style, name, color }) {
    return (
        <FontAwesomeIcon  name={name} size={size} style={[{ marginBottom: -3 }, style]} color={color}/>
    )
}