app.controller('invoiceCtrl', function ($scope, $sce, productService) {
    $scope.products = productService.getProducts();
    $scope.invoiceData = {
        clientName: '',
        items: []
    };

    $scope.addInvoiceItem = function () {
        $scope.invoiceData.items.push({productId: null, quantity: 1, price: 0, total: 0});
    };

    $scope.updateItemDetails = function (item) {
        let selectedProduct = $scope.products.find(p => p.id === item.productId);
        if (selectedProduct) {
            item.price = selectedProduct.price;
            item.description = selectedProduct.name;
            $scope.updateItemTotal(item);
        }
    };

    $scope.updateItemTotal = function (item) {
        item.total = item.quantity * item.price;
    };

    $scope.removeItem = function (index) {
        $scope.invoiceData.items.splice(index, 1);
    };

    $scope.calculateTotal = function () {
        return $scope.invoiceData.items.reduce((acc, item) => acc + item.total, 0);
    };

    $scope.generateInvoice = function () {
        let totalAmount = $scope.calculateTotal();
        let itemsHtml = $scope.invoiceData.items.map(item => {
            return `<tr>
                        <td>${item.description}</td>
                        <td>${item.quantity}</td>
                        <td>${item.price.toFixed(2)} €</td>
                        <td>${item.total.toFixed(2)} €</td>
                    </tr>`;
        }).join('');

        var invoiceHtml = `
            <h3>Facture pour ${$scope.invoiceData.clientName}</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Description</th>
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
    };

    $scope.printInvoice = function () {
        var popupWin = window.open('', '_blank', 'width=800,height=600');
        popupWin.document.open();
        popupWin.document.write(`
          <html>
            <head>
              <title>Facture</title>
              <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 5px;
                    text-align: left;
                }
              </style>
            </head>
            <body onload="window.print();window.close()">${document.getElementById('generated-invoice').innerHTML}</body>
          </html>`);
        popupWin.document.close();
    };

    $scope.openProductModal = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'productModal.html',
            controller: 'productModalCtrl',
            resolve: {
                products: function () {
                    return $scope.products;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.invoiceData.items.push({
                productId: selectedItem.id,
                quantity: selectedItem.quantity,
                price: selectedItem.price,
                description: selectedItem.description,
                total: selectedItem.quantity * selectedItem.price
            });
        });
    };
});
