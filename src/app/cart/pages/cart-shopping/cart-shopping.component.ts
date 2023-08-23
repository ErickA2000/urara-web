import { Component } from '@angular/core';
import { ICart } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.scss']
})
export class CartShoppingComponent {
  cart: ICart = {
    _id: "64e0f278396090e2d22f93dd",
    cliente: {
      _id: "64da87c297fe23ed7a99f94f",
      nombre: "Erick"
    },
    productos: [
      {
        productID: {
          _id: "64dfc419cc2b5219b2263759",
          nombre: "pruebas",
          imagenUrl: [
            "https://firebasestorage.googleapis.com/v0/b/urara-3fad9.appspot.com/o/ni%C3%B1a%2Fpruebas_1692386316499?alt=media&token=25a5e7bb-2e42-448d-b67b-7fec92eb171f",
            "https://firebasestorage.googleapis.com/v0/b/urara-3fad9.appspot.com/o/ni%C3%B1a%2Fpruebas_1692386320154?alt=media&token=0f689222-4579-481e-b1e0-f206b5991cd3",
            "https://firebasestorage.googleapis.com/v0/b/urara-3fad9.appspot.com/o/ni%C3%B1a%2Fpruebas_1692386325689?alt=media&token=55eab0ed-b4c3-4a99-a682-6a1ac9fd0126"
          ],
          tallasCantidadPrecio: [
            {
              talla: "2",
              cantidad: 2,
              precio: 10000,
              colores: [
                {
                  idColor: "64da83d3a54b1f5b95de04c7",
                  cantidad: 2
                }
              ]
            },
            {
              talla: "10",
              cantidad: 5,
              precio: 20000,
              colores: [
                {
                  idColor: "64da83aca54b1f5b95de04c1",
                  cantidad: 5
                }
              ]
            }
          ],
          descuento: 0,
          estado: "disponible"
        },
        descuento: 0,
        tallasCantidadPrecio: {
          talla: "10",
          cantidad: 4,
          precio: 30000,
          idColor: {
            _id: "64da83aca54b1f5b95de04c1",
            nombre: "gris",
            hex: "#808080",
            __v: 0
          }
        }
      },
      {
        productID: {
          _id: "64dfc419cc2b5219b2263759",
          nombre: "pruebas 2",
          imagenUrl: [
            "https://firebasestorage.googleapis.com/v0/b/urara-3fad9.appspot.com/o/ni%C3%B1a%2Fpruebas_1692386316499?alt=media&token=25a5e7bb-2e42-448d-b67b-7fec92eb171f",
            "https://firebasestorage.googleapis.com/v0/b/urara-3fad9.appspot.com/o/ni%C3%B1a%2Fpruebas_1692386320154?alt=media&token=0f689222-4579-481e-b1e0-f206b5991cd3",
            "https://firebasestorage.googleapis.com/v0/b/urara-3fad9.appspot.com/o/ni%C3%B1a%2Fpruebas_1692386325689?alt=media&token=55eab0ed-b4c3-4a99-a682-6a1ac9fd0126"
          ],
          tallasCantidadPrecio: [
            {
              talla: "2",
              cantidad: 4,
              precio: 10000,
              colores: [
                {
                  idColor: "64da83d3a54b1f5b95de04c7",
                  cantidad: 4
                }
              ]
            },
            {
              talla: "4",
              cantidad: 2,
              precio: 20000,
              colores: [
                {
                  idColor: "64da83aca54b1f5b95de04c1",
                  cantidad: 2
                }
              ]
            }
          ],
          descuento: 10,
          estado: "disponible"
        },
        descuento: 10,
        tallasCantidadPrecio: {
          talla: "4",
          cantidad: 1,
          precio: 20000,
          idColor: {
            _id: "64da83aca54b1f5b95de04c1",
            nombre: "gris",
            hex: "#808080",
            __v: 0
          }
        }
      }
    ],
    __v: 0
  }
}
