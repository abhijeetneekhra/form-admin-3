import BootstrapTable from "react-bootstrap-table-next";
//import paginationFactory from "react-bootstrap-table2-paginator";

const posts = [
  {
    id: 1,
    title: "Hello World",
    content: "Welcome to learning react!",
  },
  {
    id: 2,
    title: "Installation",
    content: "Install react from npm",
  },
  {
    id: 3,
    title: "Run App",
    content: "You can run app using npm run start",
  },
  {
    id: 4,
    title: "Build components",
    content: "Welcome to learning react!",
  },
  {
    id: 5,
    title: "Define states",
    content: "Welcome to learning react!",
  },
  {
    id: 6,
    title: "React Hooks",
    content: "Welcome to learning react!",
  },
  {
    id: 7,
    title: "List and Keys",
    content: "Welcome to learning react!",
  },
  {
    id: 8,
    title: "Form Handling",
    content: "Welcome to learning react!",
  },
  {
    id: 9,
    title: "Events",
    content: "Welcome to learning react!",
  },
];

function Admin2() {
  const columns = [
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "content",
      text: "Content",
    },
  ];

  const rowStyle = { backgroundColor: "#c8e6c9" };

  const rowStyle2 = (row, rowIndex) => {
    const style = {};
    if (row.id > 3) {
      style.backgroundColor = "#c8e6c9";
    } else {
      style.backgroundColor = "#00BFFF";
    }

    if (rowIndex > 2) {
      style.fontWeight = "bold";
      style.color = "white";
    }

    return style;
  };

  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={posts}
        columns={columns}
        rowStyle={rowStyle2}
        //pagination={paginationFactory()}
      />
    </div>
  );
}

export default Admin2;
