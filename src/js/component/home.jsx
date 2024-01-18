import React, { useState, useEffect } from "react";




const Home = () => {

	const [add, setAdd] = useState("");
	// const [list, setList] = useState(JSON.parse(localStorage.getItem("myList")) || []);
	const [list, setList] = useState([]);
	const [hoverIndex, setHoverIndex] = useState("");
	const [remainingItems, setRemainingItems] = useState(list.length);

	function keyIntro(e) {

		// e.preventDefault();
		// console.log(e.keyCode);
		let aux = []
		if (e.keyCode === 13) {
			aux = list.concat({ label: add, done: false });
			setList(list.concat({ label: add, done: false }));
			setRemainingItems(aux.length);
			setAdd("");


		}

	};

	function removeItem(index) {
		const updatedList = [...list];
		updatedList.splice(index, 1);
		setList(updatedList);
		setRemainingItems(updatedList.length);


	}

	const getUserList = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/velazcopolo')
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc. 
				if (resp.status === 404) {
					createUser()

				}
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setList(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});



	}

	const createUser = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/velazcopolo', {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				if (resp.status === 201) {
					getUserList()

				}

				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
				return data;
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});

	};



	const updateList = () => {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/velazcopolo', {
			method: 'PUT', // or 'POST'
			body: JSON.stringify(list), // la variable data puede ser un 'string' o un {objeto} que proviene de algún lugar más arriba en nuestra aplicación
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();

			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error));




	}


	useEffect(() => {

		getUserList();

	}, []);


	useEffect(() => {

		if (list.length != 0) {
			updateList();
		}

	}, [list]);



	return (
		<div className="text-center container mt-5 bg-secondary">

			<div className="mb-3 ">
				<h1>TODOS</h1>
				<input type="text" className="form-control" value={add} placeholder="add a element" onChange={(e) => setAdd(e.target.value)} onKeyDown={keyIntro} />

			</div>

			<div>
				<ul>
					{list.length > 0 ? list.map((item, index) =>
						<li
							className="d-flex justify-content-between"
							key={index}
							onMouseEnter={() => setHoverIndex(index)}
							onMouseLeave={() => setHoverIndex(null)}
						>
							{item.label}
							{hoverIndex === index && (
								<button onClick={() => removeItem(index)}>X</button>
							)}
						</li>
					) : "no hay tareas"}
				</ul>
				<p>{remainingItems} items remaining</p>
			</div>

		</div>
	);

};

export default Home;
