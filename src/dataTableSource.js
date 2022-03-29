export const userColums = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.lastName}
        </div>
      );
    },
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 230,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 230,
  },
  {
    field: "age",
    headerName: "Age",
    width: 230,
  },
];

export const userRows = [
  {
    id: 1,
    lastName: "Snow",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Jon",
    age: 35,
  },
  {
    id: 2,
    lastName: "Lannister",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Cersei",
    age: 42,
  },
  {
    id: 3,
    lastName: "Lannister",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Jaime",
    age: 45,
  },
  {
    id: 4,
    lastName: "Stark",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Arya",
    age: 16,
  },
  {
    id: 5,
    lastName: "Targaryen",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Daenerys",
    age: null,
  },
  {
    id: 6,
    lastName: "Melisandre",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: null,
    age: 150,
  },
  {
    id: 7,
    lastName: "Clifford",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Ferrara",
    age: 44,
  },
  {
    id: 8,
    lastName: "Frances",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Rossini",
    age: 36,
  },
  {
    id: 9,
    lastName: "Roxie",
    img: "https://images.pexels.com/photos/11358749/pexels-photo-11358749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    firstName: "Harvey",
    age: 65,
  },
];
