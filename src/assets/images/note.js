// if (res.status === 401 || res.status === 403) {
//     window.localStorage.removeItem("accessToken");
//     signOut();
//     return;
//   }
//   return res.json();

const products = [
  {
    name: "Alu",
    price: 12,
    description: "Alu is the cheapest vegetable in bd",
  },
  {
    name: "Gajor",
    price: 15,
    description: "Gajor is very healthy",
  },
  {
    name: "Tometo",
    price: 20,
    description: "Usually tomemto looks red",
  },
  {
    name: "Borboti",
    price: 12,
    description: "Borboti and noodles are awesome together",
  },
  {
    name: "Kumra",
    price: 42,
    description: "Bangladesh is wellknown for it's kumra beguni",
  },
];

console.log(products);
