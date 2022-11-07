export default function Welcome(props) {
    return <p>welcome({props.name})</p>;
    // 넘겨 받은 인자는 변경이 불가능한 ReadOnly이며
    // 변경해서 사용하기 위해서는 새로운 인자에 담아서 그 값을 변경시켜서 사용한다.
}