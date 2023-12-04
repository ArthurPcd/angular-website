app.controller('invoiceCtrl', function ($scope, $sce, productService, $timeout) {
    $scope.products = productService.getProducts();
    $scope.invoiceData = {
        clientName: '',
        invoiceNumber: '',
        invoiceDate: new Date().toLocaleDateString(),
        paymentTerms: '',
        companySIRET: '',
        companyVATNumber: '',
        companyAddress: '',
        companyContact: '',
        items: []
    };
    $scope.invoiceGenerated = false;
    $scope.errorMessage = '';

    $scope.isItemEmpty = item => !item.productId || item.quantity <= 0;

    $scope.addInvoiceItem = function () {
        const newItem = {productId: null, quantity: 1, price: 0, total: 0};
        $scope.invoiceData.items.push(newItem);

        $timeout(() => {
            if ($scope.isItemEmpty(newItem)) {
                const index = $scope.invoiceData.items.indexOf(newItem);
                if (index !== -1) {
                    $scope.invoiceData.items.splice(index, 1);
                }
            }
        }, 7500);
    };

    $scope.updateItemDetails = item => {
        const selectedProduct = $scope.products.find(p => p.id === item.productId);
        if (selectedProduct) {
            item.price = selectedProduct.price;
            item.description = selectedProduct.name;
            $scope.updateItemTotal(item);
        }
    };

    $scope.updateItemTotal = item => {
        item.total = item.quantity * item.price;
    };

    $scope.removeItem = index => $scope.invoiceData.items.splice(index, 1);

    $scope.calculateTotal = () => $scope.invoiceData.items.reduce((acc, item) => acc + item.total, 0);

    $scope.isPriceNaN = () => $scope.invoiceData.items.some(item => isNaN(item.total));

    $scope.generateInvoice = function () {
        if ($scope.invoiceData.items.length === 0) {
            $scope.errorMessage = "La liste des articles est vide. Veuillez ajouter des articles avant de générer la facture.";
            return;
        }
        if ($scope.isPriceNaN()) {
            $scope.errorMessage = "Veuillez vérifier les prix des articles. L'un d'entre eux semble incorrect.";
            return;
        }

        const totalAmount = $scope.calculateTotal();
        const itemsHtml = $scope.invoiceData.items.map(item => {
            return `<tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)} €</td>
                    <td>${item.total.toFixed(2)} €</td>
                </tr>`;
        }).join('');

        const invoiceHtml = `
        <h3>Facture N°${$scope.invoiceData.invoiceNumber}</h3>
        <p>Date: ${$scope.invoiceData.invoiceDate}</p>
        <p>SIRET: ${$scope.invoiceData.companySIRET}</p>
        <p>TVA: ${$scope.invoiceData.companyVATNumber}</p>
        <p>Adresse de l'entreprise: ${$scope.invoiceData.companyAddress}</p>
        <p>Contact: ${$scope.invoiceData.companyContact}</p>
        <p>Facturé à: ${$scope.invoiceData.clientName}</p>
        <table class="table">
            <thead>
                <tr>
                    <th>Article</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire</th>
                    <th>Montant</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total</td>
                    <td>${totalAmount.toFixed(2)} €</td>
                </tr>
            </tfoot>
        </table>`;

        $scope.generatedInvoiceHtml = $sce.trustAsHtml(invoiceHtml);
        $scope.invoiceGenerated = true;
        $scope.errorMessage = '';
    };

    $scope.printInvoice = function () {
        const today = new Date().toLocaleDateString();
        const invoiceStyles = `
    <style>
        body {
            font-family: 'Arial', sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        h3 {
            margin-top: 0;
        }

        .invoice-header {
            background: #f8f9fa;
            padding: 10px 0;
            text-align: center;
            border-bottom: 2px solid #ddd;
        }

        .invoice-body {
            padding: 15px;
        }

        .invoice-footer {
            text-align: center;
            padding: 10px 0;
            border-top: 2px solid #ddd;
            margin-top: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #eee;
            font-weight: bold;
        }

        tfoot tr td {
            font-weight: bold;
            background-color: #eee;
        }
    </style>`;

        const popupWin = window.open('', '_blank', 'width=800,height=600');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Facture du ${today}</title>
          ${invoiceStyles}
        </head>
        <body onload="window.print();window.close()">${document.getElementById('generated-invoice').innerHTML}</body>
      </html>`);
        popupWin.document.close();
    };
});
