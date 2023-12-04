app.service('productService', function () {
    var products = [
        {
            id: 1,
            name: "Framboise",
            price: 3.0,
            description: "Barquette de 125 grammes",
            category: "Fruits",
            quantity: 1
        },
        {id: 2, name: "Pomme", price: 2.0, description: "Barquette de 500 grammes", category: "Fruits", quantity: 1},
        {id: 3, name: "Poire", price: 2.5, description: "Barquette de 500 grammes", category: "Fruits", quantity: 1},
        {id: 4, name: "Banane", price: 1.5, description: "Les 3 bananes", category: "Fruits", quantity: 1},
        {id: 5, name: "Orange", price: 2.0, description: "Filet de 500 grammes", category: "Fruits", quantity: 1},
        {id: 6, name: "Mangue", price: 3.0, description: "Unité", category: "Fruits", quantity: 1},
        {id: 7, name: "Kiwi", price: 2.0, description: "La boite de 5 kiwis", category: "Fruits", quantity: 1},
        {id: 8, name: "Ananas", price: 3.0, description: "Unité", category: "Fruits", quantity: 1},
        {
            id: 9,
            name: "Pomme de terre",
            price: 1.75,
            description: "Le filet de 500 grammes",
            category: "Légumes",
            quantity: 1
        },
        {
            id: 10,
            name: "Carotte",
            price: 1.95,
            description: "Le sachet de 500 grammes",
            category: "Légumes",
            quantity: 1
        },
        {
            id: 11,
            name: "Tomate",
            price: 2.75,
            description: "La grappe de 500 grammes",
            category: "Légumes",
            quantity: 1
        },
        {id: 12, name: "Salade", price: 1.20, description: "Unité", category: "Légumes", quantity: 1},
        {id: 13, name: "Concombre", price: 1.5, description: "Unité", category: "Légumes", quantity: 1},
        {
            id: 14,
            name: "Steak haché",
            price: 3.0,
            description: "La barquette de 2 steaks hachés",
            category: "Viande",
            quantity: 1
        },
        {
            id: 15,
            name: "Côte de porc",
            price: 4.0,
            description: "La barquette de 2 côtes de porc",
            category: "Viande",
            quantity: 1
        },
        {
            id: 16,
            name: "Escalope de poulet",
            price: 3.0,
            description: "La barquette de 2 escalopes de poulet",
            category: "Viande",
            quantity: 1
        },
        {
            id: 17,
            name: "Rôti de boeuf",
            price: 5.0,
            description: "La barquette de 2 rôtis de boeuf",
            category: "Viande",
            quantity: 1
        },
        {
            id: 18,
            name: "Jambon",
            price: 3.0,
            description: "La barquette de 4 tranches de jambon",
            category: "Viande",
            quantity: 1
        },
        {
            id: 19,
            name: "Saucisse",
            price: 2.0,
            description: "La barquette de 4 saucisses",
            category: "Viande",
            quantity: 1
        },
        {id: 20, name: "Poulet", price: 6.0, description: "Le poulet entier", category: "Viande", quantity: 1},
        {
            id: 21,
            name: "Côte d'agneau",
            price: 5.0,
            description: "La barquette de 2 côtes d'agneau",
            category: "Viande",
            quantity: 1
        },
        {
            id: 22,
            name: "Rôti de porc",
            price: 5.0,
            description: "La barquette de 2 rôtis de porc",
            category: "Viande",
            quantity: 1
        },
        {
            id: 23,
            name: "Rôti de dinde",
            price: 5.0,
            description: "La barquette de 2 rôtis de dinde",
            category: "Viande",
            quantity: 1
        },
        {
            id: 24,
            name: "Rôti de veau",
            price: 5.0,
            description: "La barquette de 2 rôtis de veau",
            category: "Viande",
            quantity: 1
        },
        {id: 25, name: "Pâtes", price: 1.5, description: "Le paquet de 500 grammes", category: "Epicerie", quantity: 1},
        {id: 26, name: "Riz", price: 2.0, description: "Le paquet de 500 grammes", category: "Epicerie", quantity: 1},
        {
            id: 27,
            name: "Sauce tomate",
            price: 1.5,
            description: "La bouteille de 500 grammes",
            category: "Epicerie",
            quantity: 1
        },
        {id: 28, name: "Purée", price: 1.5, description: "La boite de 500 grammes", category: "Epicerie", quantity: 1},
        {id: 29, name: "Soupe", price: 1.5, description: "La boite de 500 grammes", category: "Epicerie", quantity: 1},
        {
            id: 30,
            name: "Céréales",
            price: 2.5,
            description: "La boite de 500 grammes",
            category: "Epicerie",
            quantity: 1
        },
        {id: 31, name: "Chips", price: 2.0, description: "Le paquet de 500 grammes", category: "Epicerie", quantity: 1},
        {
            id: 32,
            name: "Biscuits",
            price: 2.0,
            description: "Le paquet de 500 grammes",
            category: "Epicerie",
            quantity: 1
        },
        {id: 33, name: "Café", price: 3.0, description: "Le paquet de 500 grammes", category: "Epicerie", quantity: 1},
        {id: 34, name: "Thé", price: 3.0, description: "Le paquet de 500 grammes", category: "Epicerie", quantity: 1},
        {id: 35, name: "Lait", price: 1.0, description: "La bouteille de 1 litre", category: "Epicerie", quantity: 1},
        {id: 36, name: "Eau", price: 0.5, description: "La bouteille de 1 litre", category: "Epicerie", quantity: 1},
        {
            id: 37,
            name: "Jus de fruit",
            price: 2.0,
            description: "La bouteille de 1 litre",
            category: "Epicerie",
            quantity: 1
        },
        {
            id: 38,
            name: "Coca-Cola",
            price: 2.0,
            description: "La bouteille de 1 litre",
            category: "Epicerie",
            quantity: 1
        },
        {id: 39, name: "Pain", price: 1.0, description: "La baguette", category: "Epicerie", quantity: 1},
        {
            id: 40,
            name: "Beurre",
            price: 2.0,
            description: "La plaquette de 250 grammes",
            category: "Epicerie",
            quantity: 1
        },
        {
            id: 41,
            name: "Fromage",
            price: 3.0,
            description: "La plaquette de 250 grammes",
            category: "Epicerie",
            quantity: 1
        },
        {
            id: 42,
            name: "Yaourt",
            price: 1.0,
            description: "La plaquette de 4 yaourts",
            category: "Epicerie",
            quantity: 1
        },
        {id: 43, name: "Oeufs", price: 2.0, description: "La boite de 6 oeufs", category: "Epicerie", quantity: 1},
        {id: 44, name: "Miel", price: 3.0, description: "Le pot de 500 grammes", category: "Epicerie", quantity: 1},
        {id: 45, name: "Nutella", price: 4.0, description: "Le pot de 500 grammes", category: "Epicerie", quantity: 1},
        {
            id: 46,
            name: "Chocolat",
            price: 2.0,
            description: "La tablette de 200 grammes",
            category: "Epicerie",
            quantity: 1
        },
        {
            id: 47,
            name: "Papier toilette",
            price: 2.0,
            description: "Le paquet de 6 rouleaux",
            category: "Epicerie",
            quantity: 1
        },
        {
            id: 48,
            name: "Mini-saucissons",
            price: 2.0,
            description: "La boite de 10 mini-saucissons",
            category: "Epicerie",
            quantity: 1
        },
        {
            id: 49,
            name: "Pain de mie",
            price: 1.5,
            description: "La boite de 10 tranches",
            category: "Epicerie",
            quantity: 1
        },
        {
            id: 50,
            name: "Pain au chocolat",
            price: 2.0,
            description: "La boite de 10 pains au chocolat",
            category: "Epicerie",
            quantity: 1
        }
    ];

    this.getProducts = function () {
        return products;
    };
});
