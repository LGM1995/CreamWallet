import axios from "axios";

const creamL = [];

function creamList() {
  const rrr = async () => {
    await axios.get('/api/' + localStorage.getItem("username"), {
      headers: {
        Authorization: localStorage.getItem("Authorization")
      }
    }).then((res) => {
      console.log(res.data)
      return <li>
        {res.data.menu}
      </li>
    })
  }
}
export default function Main() {

    console.log(localStorage.getItem("username"));
    console.log(localStorage.getItem("Authorization"));

  return (
    <div>
      <creamList/>
    </div>
  )
}