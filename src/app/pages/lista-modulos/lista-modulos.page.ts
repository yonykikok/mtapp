import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { FormModuloComponent } from 'src/app/components/forms/form-modulo/form-modulo.component';
import { DetalleModuloComponent } from 'src/app/components/views/detalle-modulo/detalle-modulo.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-modulos',
  templateUrl: './lista-modulos.page.html',
  styleUrls: ['./lista-modulos.page.scss'],
})
export class ListaModulosPage implements OnInit {
  loggedUser: User | null = null;
  camposSeleccionados = ['modelo', 'calidad', 'precio'];
  modulos = [
    {
      "marca": "Samsung",
      "modelo": "A01",
      "precio": 30,
      "tipo": "Simple",
      "hovered": true,
      "id": "74Tpi77Cv53jbOjqwgu7",
      "calidad": "GenBueno",
      "stock": [
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ]
    },
    {
      "hovered": true,
      "tipo": "Simple",
      "calidad": "Original Oled",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "modelo": "A01 Core",
      "precio": 30,
      "id": "dfRpAv2ZjI9zS4MSq3pA",
      "marca": "Samsung"
    },
    {
      "tipo": "Simple",
      "marca": "Samsung",
      "modelo": "A02",
      "precio": 30,
      "calidad": "GenBueno",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "hZZvIEwJWV032vhxi2k0",
      "hovered": true
    },
    {
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "hovered": true,
      "id": "fR7xyCRO4vI9g69hbHi5",
      "modelo": "A02",
      "calidad": "Original Oled",
      "tipo": "Simple",
      "precio": 38
    },
    {
      "tipo": "Simple",
      "calidad": "GenBueno",
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        },
        {
          "color": "Gris",
          "cantidad": 1
        }
      ],
      "modelo": "A02S",
      "id": "CH6m7iyWoH1L6161h2ZE",
      "precio": 35,
      "marca": "Samsung"
    },
    {
      "tipo": "C/M",
      "id": "x3XzWoMU4BNTzMaETxdU",
      "precio": 40,
      "hovered": true,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        },
        {
          "cantidad": "3",
          "color": "Negro"
        }
      ],
      "marca": "Samsung",
      "calidad": "GenBueno",
      "modelo": "A02S"
    },
    {
      "precio": 46.84,
      "calidad": "Estandar",
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "tipo": "Simple",
      "modelo": "A03",
      "id": "yCIIr5XU3Zr5dlrSQPt2"
    },
    {
      "modelo": "A03 core",
      "tipo": "Simple",
      "calidad": "Original Oled",
      "marca": "Samsung",
      "id": "jWQy18Gp98HycTlGnJao",
      "stock": [
        {
          "cantidad": "3",
          "color": "Negro"
        }
      ],
      "precio": 32,
      "hovered": true
    },
    {
      "id": "tuyGimzbXKc0wlcr4nMj",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "marca": "Samsung",
      "precio": 30,
      "modelo": "A03s",
      "calidad": "Estandar",
      "hovered": true
    },
    {
      "calidad": "Estandar",
      "tipo": "C/M",
      "marca": "Samsung",
      "hovered": true,
      "modelo": "A03s",
      "precio": 36,
      "id": "nbFUtrUJKcVB5yhbc5pH",
      "stock": [
        {
          "cantidad": "4",
          "color": "Negro"
        }
      ]
    },
    {
      "calidad": "GenBueno",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "hovered": true,
      "tipo": "Simple",
      "modelo": "A04",
      "marca": "Samsung",
      "id": "ZqSEi9N8n29SHvNUQR7p",
      "precio": 33
    },
    {
      "modelo": "A04s",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "marca": "Samsung",
      "hovered": true,
      "precio": 33,
      "id": "3q3pLoecyC2BiLRVjSo6",
      "tipo": "Simple",
      "calidad": "GenBueno"
    },
    {
      "modelo": "A10",
      "hovered": true,
      "precio": 29,
      "marca": "Samsung",
      "tipo": "Simple",
      "calidad": "GenBueno",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "tbKB4K7Jhlh5RWhWC4Hz"
    },
    {
      "marca": "Samsung",
      "modelo": "A10",
      "precio": 32,
      "id": "OTkIHdEYfNTWlutzNAeG",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "calidad": "Original Oled",
      "tipo": "Simple",
      "hovered": true
    },
    {
      "tipo": "C/M",
      "stock": [],
      "marca": "Samsung",
      "hovered": true,
      "modelo": "A10",
      "id": "i0a7Hkc4X9mIZ213UqxR",
      "calidad": "Original Oled",
      "precio": 38
    },
    {
      "hovered": true,
      "modelo": "A10",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "marca": "Samsung",
      "precio": 54,
      "tipo": "C/M",
      "id": "iSjxMSn3u2DIJvMwq6na",
      "calidad": "Original Certificado"
    },
    {
      "tipo": "Simple",
      "hovered": true,
      "precio": 29,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "calidad": "GenBueno",
      "id": "fgwMbsdySUwbAx2xEchy",
      "modelo": "A10S",
      "marca": "Samsung"
    },
    {
      "modelo": "A10S",
      "tipo": "Simple",
      "hovered": true,
      "calidad": "Original Oled",
      "precio": 40,
      "marca": "Samsung",
      "id": "RBBFlrOoUZgGtBO4zAUb",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "calidad": "Original Certificado",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "A10S",
      "marca": "Samsung",
      "precio": 50,
      "id": "0zPD1wwugssUhq5c8K3d",
      "hovered": true,
      "tipo": "Simple"
    },
    {
      "tipo": "Simple",
      "marca": "Samsung",
      "calidad": "GenBueno",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "precio": 30,
      "hovered": true,
      "id": "a2ECjWlQPqECbo0Ej2uJ",
      "modelo": "A11"
    },
    {
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Original Oled",
      "id": "3XDaQA2V3GliKn5zdzSY",
      "hovered": true,
      "marca": "Samsung",
      "modelo": "A11",
      "tipo": "Simple",
      "precio": 35
    },
    {
      "hovered": true,
      "calidad": "GenBueno",
      "id": "mssVoDPf7OMyznj1BqXH",
      "tipo": "Simple",
      "modelo": "A12",
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": "3",
          "color": "Negro"
        }
      ],
      "precio": 32
    },
    {
      "hovered": true,
      "id": "BBqGUCcHhlA9Ewtxw7c7",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "modelo": "A13",
      "calidad": "GenBueno",
      "marca": "Samsung",
      "precio": 33
    },
    {
      "id": "nXpSHPyqRAGXt6IHY4Dr",
      "calidad": "Estandar",
      "precio": 42,
      "hovered": true,
      "marca": "Xiaomi",
      "modelo": "A2 Lite",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "tipo": "Simple"
    },
    {
      "hovered": true,
      "precio": 40,
      "calidad": "GenBueno",
      "marca": "Samsung",
      "tipo": "Simple",
      "id": "mWThXd6OnZm6iNYd2kAq",
      "modelo": "A20",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "tipo": "C/M",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": "1"
        }
      ],
      "marca": "Samsung",
      "modelo": "A20",
      "hovered": true,
      "precio": 45,
      "calidad": "GenBueno",
      "id": "PUfu3JjCcs5s6XmIsBoT"
    },
    {
      "modelo": "A20",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "hovered": true,
      "precio": 50,
      "id": "SZJ06BdswnIXxVk8FQxv",
      "calidad": "Original Oled",
      "marca": "Samsung",
      "tipo": "C/M"
    },
    {
      "precio": 70,
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "C/M",
      "marca": "Samsung",
      "calidad": "Original Certificado",
      "id": "tGhI1qCpqBUWC5LOE6Hg",
      "modelo": "A20"
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "id": "DCo215Y45H3L4QA2GMXj",
      "calidad": "GenBueno",
      "precio": 35,
      "modelo": "A20S",
      "tipo": "Simple",
      "marca": "Samsung"
    },
    {
      "id": "0rgH9c9kDgXo3VJxAiMg",
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true,
      "tipo": "C/M",
      "precio": 46,
      "calidad": "GenBueno",
      "modelo": "A20S"
    },
    {
      "hovered": true,
      "calidad": "Original Oled",
      "id": "624nX9C3efLMc8ouJTB1",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "modelo": "A20S",
      "precio": 54,
      "marca": "Samsung",
      "tipo": "C/M"
    },
    {
      "modelo": "A21S",
      "tipo": "Simple",
      "calidad": "GenBueno",
      "marca": "Samsung",
      "id": "eP3boqzcG3ejo7BDlenP",
      "precio": 38,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "hovered": true
    },
    {
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "aNq3QY9HPYl8FfK7itQL",
      "hovered": true,
      "tipo": "C/M",
      "precio": 42,
      "modelo": "A21S",
      "marca": "Samsung",
      "calidad": "GenBueno"
    },
    {
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "precio": 50,
      "calidad": "Original Oled",
      "id": "HhMBoAQTkKO0itAvE0ww",
      "hovered": true,
      "marca": "Samsung",
      "modelo": "A21S"
    },
    {
      "marca": "Samsung",
      "modelo": "A21S",
      "calidad": "Original Oled",
      "id": "TATuxxtdEIriBIPQ5AkT",
      "tipo": "C/M",
      "precio": 56,
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "hovered": true,
      "modelo": "A22 4G",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "marca": "Samsung",
      "calidad": "GenBueno",
      "id": "4hHKmk185aebiH0Bxeky",
      "precio": 45
    },
    {
      "modelo": "A22 4G",
      "id": "xP4LWcXZ0WcStjyqv8VP",
      "marca": "Samsung",
      "hovered": true,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "calidad": "Estandar",
      "tipo": "Simple",
      "precio": 58
    },
    {
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "modelo": "A23",
      "calidad": "GenBueno",
      "hovered": true,
      "id": "O4PWyTEgcyykpiqP9Btb",
      "precio": 35,
      "marca": "Samsung"
    },
    {
      "hovered": true,
      "modelo": "A23",
      "calidad": "Original Oled",
      "tipo": "Simple",
      "marca": "Samsung",
      "precio": 50,
      "id": "ZgVkiIFlk3eETHTrr2hb",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ]
    },
    {
      "precio": 42,
      "calidad": "GenBueno",
      "modelo": "A30",
      "tipo": "Simple",
      "id": "cjPctWMsQDrrzqxsbcoD",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true,
      "marca": "Samsung"
    },
    {
      "modelo": "A30",
      "calidad": "Original Oled",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "ZNZO3MmstKrZsexySpr6",
      "marca": "Samsung",
      "hovered": true,
      "precio": 50,
      "tipo": "C/M"
    },
    {
      "marca": "Samsung",
      "hovered": true,
      "precio": 85,
      "tipo": "C/M",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "A30",
      "id": "2jXm3aGtccUlRWmt3Tau",
      "calidad": "Original Certificado"
    },
    {
      "modelo": "A30S",
      "precio": 44,
      "tipo": "C/M",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "9rdksr67m4U9CVSDu9ad",
      "marca": "Samsung",
      "calidad": "GenBueno",
      "hovered": true
    },
    {
      "modelo": "A30S",
      "tipo": "Simple",
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "calidad": "GenBueno",
      "id": "yMikaKwexeLFOYbSOtYZ",
      "precio": 44
    },
    {
      "precio": 48,
      "hovered": true,
      "modelo": "A30S",
      "tipo": "C/M",
      "calidad": "Original Oled",
      "id": "DLDyyYOcom0GKNgsWo2X",
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ]
    },
    {
      "modelo": "A30S",
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Original Certificado",
      "precio": 91,
      "tipo": "C/M",
      "hovered": true,
      "id": "GibrF8VRQyH3CMpb7450"
    },
    {
      "modelo": "A31",
      "hovered": true,
      "marca": "Samsung",
      "id": "p534ygFql8FcPEUHMLnZ",
      "precio": 48,
      "calidad": "GenBueno",
      "tipo": "C/M",
      "stock": [
        {
          "cantidad": "4",
          "color": "Negro"
        }
      ]
    },
    {
      "id": "9kPeinr4LXzRIHX0E4kl",
      "calidad": "Original Oled",
      "hovered": true,
      "marca": "Samsung",
      "tipo": "C/M",
      "modelo": "A31",
      "precio": 57,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ]
    },
    {
      "id": "CSAF42XatitzuGL1LBzW",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "modelo": "A31",
      "marca": "Samsung",
      "tipo": "Simple",
      "hovered": true,
      "calidad": "Original Certificado",
      "precio": 100
    },
    {
      "calidad": "GenBueno",
      "marca": "Samsung",
      "precio": 55,
      "hovered": true,
      "modelo": "A32 4g",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "C/M",
      "id": "zT5pu3BiQMc5UE5MSxvj"
    },
    {
      "tipo": "Simple",
      "precio": 60,
      "calidad": "Original Oled",
      "id": "PwSNTPOM15jsFLiirvLP",
      "hovered": true,
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "modelo": "A32 5g",
      "marca": "Samsung"
    },
    {
      "tipo": "Simple",
      "modelo": "A5",
      "hovered": true,
      "precio": 33,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "marca": "Samsung",
      "id": "gkiBxDYtLOh0FEZxjUrv",
      "calidad": "AAA"
    },
    {
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "marca": "Samsung",
      "modelo": "a5 2016",
      "calidad": "Original Oled",
      "tipo": "Simple",
      "hovered": true,
      "id": "xcMZRTYFthEQ0ziWDuiU",
      "precio": 49.5
    },
    {
      "hovered": true,
      "modelo": "A50",
      "id": "stcyrjig4qnwpcP2YdV0",
      "marca": "Samsung",
      "calidad": "GenBueno",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "tipo": "Simple",
      "precio": 42
    },
    {
      "tipo": "C/M",
      "marca": "Samsung",
      "calidad": "GenBueno",
      "id": "miV87nH5IotlmXGEYJyJ",
      "modelo": "A50",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 45
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "calidad": "Original Oled",
      "modelo": "A50",
      "tipo": "Simple",
      "id": "BBlmaKwG2Gnq8j70nEBk",
      "precio": 50,
      "marca": "Samsung"
    },
    {
      "id": "vmmw5z9tpSMrrFyxgclN",
      "tipo": "C/M",
      "calidad": "Original Oled",
      "precio": 54,
      "modelo": "A50",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "marca": "Samsung",
      "hovered": true
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "calidad": "Original Certificado",
      "modelo": "A50",
      "marca": "Samsung",
      "id": "po5o0vWBM6xTeeloNv65",
      "hovered": true,
      "precio": 91,
      "tipo": "C/M"
    },
    {
      "tipo": "C/M",
      "id": "NalzLQk1Qo1aOXbhsxLf",
      "precio": 45,
      "hovered": true,
      "calidad": "GenBueno",
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "modelo": "A51"
    },
    {
      "tipo": "C/M",
      "modelo": "A51",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "KB82OQkqAMu5gTEEvYMi",
      "hovered": true,
      "calidad": "Original Oled",
      "marca": "Samsung",
      "precio": 60
    },
    {
      "precio": 69,
      "calidad": "Original Oled",
      "hovered": true,
      "id": "dRSh4F7Z0Xifw6RNLSxZ",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "tipo": "C/M",
      "marca": "Samsung",
      "modelo": "a52"
    },
    {
      "marca": "Samsung",
      "modelo": "a52s",
      "precio": 109.7,
      "calidad": "Original Oled",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "tipo": "C/M",
      "id": "qwBmysXJtkruc5uZ7UmA",
      "hovered": true
    },
    {
      "marca": "Samsung",
      "tipo": "C/M",
      "modelo": "A53",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "precio": 95,
      "calidad": "GenBueno",
      "id": "uFVx2sKMAgQOS6UwR0ww"
    },
    {
      "marca": "Samsung",
      "hovered": true,
      "precio": 66,
      "id": "PgKlEXZyPEn2XKkKmMTq",
      "calidad": "Original Oled",
      "modelo": "A6 plus",
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ]
    },
    {
      "modelo": "A7 2017",
      "tipo": "Simple",
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "calidad": "Original Oled",
      "id": "6gdtpEyo8KXoS81ghg49",
      "precio": 50
    },
    {
      "marca": "Samsung",
      "calidad": "GenBueno",
      "precio": 50,
      "modelo": "A7 2018",
      "id": "FGyqYyXnWfXUmvTz8pgt",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "Simple"
    },
    {
      "calidad": "Original Oled",
      "precio": 60,
      "id": "lBGl0TCwWQvpK2P50B4R",
      "tipo": "Simple",
      "modelo": "A7 2018",
      "marca": "Samsung",
      "hovered": true,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ]
    },
    {
      "tipo": "C/M",
      "modelo": "A7 2018",
      "precio": 80,
      "hovered": true,
      "id": "Z5QQOdktnOzsHSD3vY5K",
      "marca": "Samsung",
      "calidad": "Original Certificado",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ]
    },
    {
      "hovered": true,
      "calidad": "GenBueno",
      "marca": "Samsung",
      "modelo": "A70",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "pYp9GJM156TozGWTsKMr",
      "tipo": "C/M",
      "precio": 70
    },
    {
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Original Oled",
      "tipo": "C/M",
      "modelo": "A70",
      "hovered": true,
      "precio": 80,
      "id": "G1QLQhXY7Zzpipx3wWYs"
    },
    {
      "tipo": "C/M",
      "hovered": true,
      "precio": 58,
      "calidad": "GenBueno",
      "modelo": "A71",
      "id": "oR9O4iS8VPgpE1lhAJpG",
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "tipo": "C/M",
      "modelo": "A71",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 92,
      "id": "vxAUt0bsnhUtDjwA7IoS",
      "calidad": "Original Oled",
      "hovered": true,
      "marca": "Samsung"
    },
    {
      "modelo": "a72",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "marca": "Samsung",
      "precio": 100,
      "tipo": "Simple",
      "calidad": "Estandar",
      "id": "Q0w3to1w3yNIQB0NnFi8"
    },
    {
      "modelo": "A8 2018",
      "calidad": "GenBueno",
      "precio": 46,
      "tipo": "Simple",
      "hovered": true,
      "id": "DcAtmus6n4fjjX93cfDd",
      "marca": "Samsung",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ]
    },
    {
      "modelo": "C Plus",
      "id": "vkkMwLLfGEmn7QE4qstV",
      "marca": "Motorola",
      "calidad": "Estandar",
      "hovered": true,
      "tipo": "Simple",
      "stock": [],
      "precio": 31
    },
    {
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "tipo": "Simple",
      "calidad": "Estandar",
      "precio": 37,
      "id": "qMYNiVZFgbBYdal09JZl",
      "modelo": "e32",
      "marca": "Motorola",
      "hovered": true
    },
    {
      "calidad": "Estandar",
      "tipo": "C/M",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "1Ecy4nFPoLcwWKuGnvrA",
      "hovered": true,
      "precio": 40,
      "marca": "Motorola",
      "modelo": "e32"
    },
    {
      "precio": 28,
      "id": "NlCQx5da3K0uMcHyPW9b",
      "tipo": "Simple",
      "calidad": "Estandar",
      "modelo": "E4 Plus",
      "marca": "Motorola",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true
    },
    {
      "modelo": "e5 play",
      "marca": "Motorola",
      "hovered": true,
      "tipo": "Simple",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "R7OQbEx8xUp9JMD02fgG",
      "calidad": "Estandar",
      "precio": 32
    },
    {
      "id": "M7bQOaKpohkjj6xADlSn",
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "precio": 31,
      "modelo": "E5 Play Go",
      "tipo": "Simple",
      "calidad": "Estandar",
      "marca": "Motorola"
    },
    {
      "marca": "Motorola",
      "stock": [
        {
          "cantidad": "3",
          "color": "Negro"
        }
      ],
      "hovered": true,
      "id": "AMisfdA48U9QeN4Zid7m",
      "precio": 35,
      "calidad": "Estandar",
      "tipo": "Simple",
      "modelo": "E5 Plus"
    },
    {
      "tipo": "Simple",
      "modelo": "E6",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Estandar",
      "marca": "Motorola",
      "hovered": true,
      "id": "c49ZQI2tyVJ0PynQefRy",
      "precio": 38
    },
    {
      "modelo": "E6 play",
      "tipo": "C/M",
      "precio": 39,
      "marca": "Motorola",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "calidad": "Estandar",
      "id": "fuPVtgRbYjSGzqJaDrlB",
      "hovered": true
    },
    {
      "tipo": "Simple",
      "hovered": true,
      "modelo": "E6 Play",
      "stock": [
        {
          "cantidad": "3",
          "color": "Negro"
        }
      ],
      "marca": "Motorola",
      "id": "XG9C0WhbUHQKCGtplerd",
      "calidad": "Estandar",
      "precio": 37
    },
    {
      "id": "y0JV2tjDxXm0vUSPYnLk",
      "precio": 35,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "marca": "Motorola",
      "tipo": "Simple",
      "hovered": true,
      "modelo": "E6 Plus",
      "calidad": "Estandar"
    },
    {
      "hovered": true,
      "calidad": "Estandar",
      "id": "XALipYMwqznda0xO2jkZ",
      "tipo": "Simple",
      "modelo": "E6S",
      "marca": "Motorola",
      "precio": 35,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ]
    },
    {
      "id": "qDcIkM2czyH6hLxUbUx4",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "precio": 35,
      "marca": "Motorola",
      "calidad": "Estandar",
      "hovered": true,
      "modelo": "E7 / E7 i power",
      "tipo": "Simple"
    },
    {
      "modelo": "E7 i power / E7",
      "tipo": "Simple",
      "precio": 35,
      "marca": "Samsung",
      "calidad": "Estandar",
      "id": "TNrqgTD3H0LFVJWmW74H",
      "hovered": true,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ]
    },
    {
      "modelo": "E7 Plus / G9 play",
      "stock": [],
      "calidad": "Estandar",
      "hovered": true,
      "id": "TtllmqBomb1YSSDpzIvi",
      "precio": 32,
      "tipo": "Simple",
      "marca": "Motorola"
    },
    {
      "calidad": "Estandar",
      "precio": 161,
      "modelo": "Edge 20 lite",
      "marca": "Motorola",
      "tipo": "C/M",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "id": "S3Ooc89wHfVRas2ZXUiQ"
    },
    {
      "calidad": "Estandar",
      "marca": "Motorola",
      "modelo": "Fusion",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "tipo": "Simple",
      "id": "OsSJZsmpMkYqRSYkVGCP",
      "hovered": true,
      "precio": 44
    },
    {
      "id": "VC9GNc6XXwm1lHP9GMQF",
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "calidad": "Estandar",
      "modelo": "G Pro",
      "precio": 40,
      "hovered": true,
      "marca": "Xiaomi"
    },
    {
      "hovered": true,
      "calidad": "Original Oled",
      "tipo": "Simple",
      "precio": 58,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "marca": "Motorola",
      "modelo": "G100",
      "id": "MU95iTxnADkF1v9YqKd8"
    },
    {
      "calidad": "Original Oled",
      "modelo": "G100",
      "marca": "Motorola",
      "id": "pY2JZ26bYhprwCx6Zzej",
      "precio": 63,
      "tipo": "C/M",
      "hovered": true,
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ]
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "precio": 27,
      "hovered": true,
      "marca": "Motorola",
      "calidad": "Estandar",
      "id": "zUPtrPfFc3pcVCaEkxbN",
      "tipo": "Simple",
      "modelo": "G2"
    },
    {
      "modelo": "G20",
      "hovered": true,
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "tipo": "Simple",
      "marca": "Motorola",
      "precio": 39,
      "id": "7ip9fkKW4SKqvwiWGMj1",
      "calidad": "Estandar"
    },
    {
      "hovered": true,
      "id": "mhn64ow7YD4ro82tv6ON",
      "calidad": "Estandar",
      "tipo": "Simple",
      "marca": "Motorola",
      "modelo": "G3",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 28
    },
    {
      "precio": 32,
      "id": "7cz8RIzjxAnEyvvfMcES",
      "marca": "Apple",
      "tipo": "Simple",
      "modelo": "G3",
      "hovered": true,
      "stock": [
        {
          "color": "Blanco",
          "cantidad": "1"
        }
      ],
      "calidad": "GenBueno"
    },
    {
      "marca": "Motorola",
      "calidad": "Estandar",
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "modelo": "G4",
      "tipo": "Simple",
      "precio": 30,
      "id": "l3FlSrkdA9G8yKLCnZM3"
    },
    {
      "stock": [
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ],
      "tipo": "Simple",
      "modelo": "G4 Play",
      "calidad": "Estandar",
      "precio": 31,
      "hovered": true,
      "id": "30ZB55RDiM1U54CKXyzf",
      "marca": "Motorola"
    },
    {
      "marca": "Motorola",
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true,
      "precio": 34,
      "id": "bxgPPOheolE4M617Xpu0",
      "modelo": "G4 Plus",
      "tipo": "Simple"
    },
    {
      "tipo": "Simple",
      "calidad": "Estandar",
      "marca": "Motorola",
      "precio": 33,
      "id": "vnmQmnU4LF53Z2vU7bAH",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "modelo": "G5"
    },
    {
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "oxvrXklIObQkP69snuTJ",
      "precio": 34,
      "calidad": "Estandar",
      "marca": "Motorola",
      "modelo": "G5 Plus",
      "tipo": "Simple"
    },
    {
      "modelo": "g52",
      "marca": "Motorola",
      "calidad": "Estandar",
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "precio": 96.39,
      "id": "w5iIjprCYpZCWtzPNDbk"
    },
    {
      "marca": "Motorola",
      "modelo": "g52",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "tipo": "C/M",
      "calidad": "Estandar",
      "precio": 108.44,
      "id": "CHcliDWpi1ispgde39aN"
    },
    {
      "tipo": "Simple",
      "precio": 36,
      "id": "dqYX9gfkOXE5uJMvChFm",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "calidad": "Estandar",
      "modelo": "G5S",
      "marca": "Motorola"
    },
    {
      "hovered": true,
      "id": "3sxJcySPMhaNvmpXIHpJ",
      "stock": [
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ],
      "precio": 30,
      "marca": "Motorola",
      "modelo": "G5S Plus",
      "calidad": "Estandar",
      "tipo": "Simple"
    },
    {
      "marca": "Motorola",
      "modelo": "G6",
      "tipo": "Simple",
      "id": "CzQjGhSNAJ4CFzI42z6z",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "3"
        }
      ],
      "precio": 37,
      "calidad": "Estandar"
    },
    {
      "modelo": "G6 Plus",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true,
      "tipo": "Simple",
      "precio": 38,
      "calidad": "Estandar",
      "id": "zGOhO6gmKz9RmqCp20qD",
      "marca": "Motorola"
    },
    {
      "marca": "Motorola",
      "tipo": "Simple",
      "id": "LMocM3DIJU06ce1ICC3p",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "3"
        }
      ],
      "precio": 42,
      "calidad": "Estandar",
      "hovered": true,
      "modelo": "G7"
    },
    {
      "modelo": "G7 Play",
      "stock": [
        {
          "cantidad": "6",
          "color": "Negro"
        }
      ],
      "tipo": "Simple",
      "hovered": true,
      "precio": 39,
      "calidad": "Estandar",
      "id": "K9MpjvXCKpPzu0jUiykH",
      "marca": "Motorola"
    },
    {
      "calidad": "Estandar",
      "hovered": true,
      "tipo": "Simple",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "G7 Plus",
      "id": "WMl4LXp4HEikjggfAaQp",
      "precio": 47,
      "marca": "Motorola"
    },
    {
      "modelo": "G7 Power",
      "marca": "Motorola",
      "calidad": "Estandar",
      "hovered": true,
      "id": "MEljiTsDMoC4lYE4RWnK",
      "precio": 42,
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "stock": [],
      "calidad": "Estandar",
      "tipo": "Simple",
      "hovered": true,
      "precio": 41,
      "id": "mI3HCl4qnavjrtGHtYha",
      "modelo": "G8",
      "marca": "Motorola"
    },
    {
      "id": "IqhNETlP2Zb865fBBFKR",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "4"
        }
      ],
      "tipo": "Simple",
      "marca": "Motorola",
      "modelo": "G8 Play / one macro",
      "hovered": true,
      "precio": 38,
      "calidad": "Estandar"
    },
    {
      "stock": [
        {
          "cantidad": "3",
          "color": "Negro"
        }
      ],
      "hovered": true,
      "id": "UqwnqKJBmqkQg3IJQrKG",
      "marca": "Motorola",
      "calidad": "Estandar",
      "precio": 38,
      "tipo": "Simple",
      "modelo": "G8 Plus"
    },
    {
      "modelo": "G8 Power",
      "precio": 42,
      "marca": "Motorola",
      "calidad": "Estandar",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "tipo": "Simple",
      "id": "cl4plQlKf4AySfBWkdKM",
      "hovered": true
    },
    {
      "tipo": "Simple",
      "marca": "Motorola",
      "precio": 38,
      "id": "EOR23sZCl7OH7MCe4DIE",
      "calidad": "Estandar",
      "hovered": true,
      "modelo": "G8 Power Lite",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ]
    },
    {
      "hovered": true,
      "precio": 32,
      "modelo": "G9 Play / E7 plus",
      "calidad": "Estandar",
      "marca": "Motorola",
      "id": "gGpuf5TvBWb0BPruMYZt",
      "tipo": "Simple",
      "stock": []
    },
    {
      "tipo": "Simple",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "3"
        }
      ],
      "calidad": "Estandar",
      "marca": "Motorola",
      "modelo": "G9 Plus",
      "id": "b7pO4okkUrb5zfKO539G",
      "precio": 50
    },
    {
      "modelo": "g9 power",
      "precio": 45.2,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Estandar",
      "hovered": true,
      "marca": "Motorola",
      "tipo": "Simple",
      "id": "oT8RRNuFub71XsCtBWBT"
    },
    {
      "modelo": "GW Metal",
      "calidad": "Estandar",
      "precio": 38,
      "tipo": "Simple",
      "id": "BHl8U8nTudkzS33wXXQR",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "marca": "Huawei",
      "hovered": true
    },
    {
      "modelo": "huawei g8",
      "tipo": "Simple",
      "precio": 35.4,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "hovered": true,
      "calidad": "Estandar",
      "marca": "Huawei",
      "id": "CdHv9faxpKYQ0bwafnBx"
    },
    {
      "marca": "Apple",
      "modelo": "iphone  5S",
      "calidad": "Estandar",
      "precio": 30,
      "hovered": true,
      "tipo": "Simple",
      "id": "0yWS82sP3ZYd4E30GzTC",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ]
    },
    {
      "marca": "Apple",
      "calidad": "Original Oled",
      "modelo": "iphone 11",
      "tipo": "C/M",
      "precio": 80,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "Pauwck6fg3q4TL56reGN"
    },
    {
      "calidad": "Estandar",
      "modelo": "iphone 11 pro",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "precio": 86.42,
      "marca": "Apple",
      "id": "dHhRjFoVHX0QOO5tJPGV"
    },
    {
      "precio": 30,
      "id": "MKYZBsxkfrC26iQwiuN5",
      "marca": "Apple",
      "tipo": "Simple",
      "hovered": true,
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "iphone 5C"
    },
    {
      "precio": 30,
      "marca": "Apple",
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "6yMmKgOf7Piltbb7j0Ht",
      "modelo": "iphone 5G",
      "hovered": true,
      "tipo": "Simple"
    },
    {
      "modelo": "iphone 6G",
      "precio": 32,
      "tipo": "Simple",
      "marca": "Apple",
      "hovered": true,
      "calidad": "Estandar",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "d725lJ5scPaTrcfli5mX"
    },
    {
      "modelo": "iphone 6G",
      "calidad": "GenBueno",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": "1"
        }
      ],
      "hovered": true,
      "id": "McF7QUM0xSam25HE89UN",
      "tipo": "C/M",
      "precio": 38,
      "marca": "Apple"
    },
    {
      "modelo": "iphone 6G Plus",
      "marca": "Apple",
      "tipo": "Simple",
      "calidad": "Estandar",
      "id": "LERlbjWRPfTZ0zWLxtZI",
      "precio": 35,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true
    },
    {
      "tipo": "C/M",
      "hovered": true,
      "precio": 39,
      "modelo": "iphone 6G Plus",
      "stock": [
        {
          "cantidad": "1",
          "color": "Blanco"
        },
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "marca": "Apple",
      "calidad": "GenBueno",
      "id": "kx0lD6YM9EH83pfFH4cI"
    },
    {
      "precio": 31,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "marca": "Apple",
      "calidad": "Estandar",
      "id": "y46rTKQJMk9PEh8IoJI7",
      "hovered": true,
      "modelo": "iphone 6S",
      "tipo": "Simple"
    },
    {
      "stock": [
        {
          "color": "Blanco",
          "cantidad": "1"
        }
      ],
      "modelo": "iphone 6S",
      "id": "2wPLKbJ4nyGI0kGjLiHX",
      "tipo": "C/M",
      "calidad": "GenBueno",
      "hovered": true,
      "precio": 39,
      "marca": "Apple"
    },
    {
      "marca": "Apple",
      "id": "J3AzLOwHoacIC1KvLymQ",
      "modelo": "iphone 6S Plus",
      "tipo": "Simple",
      "hovered": true,
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 36
    },
    {
      "precio": 40,
      "id": "9d0e1QAJAz3cbuqSD9Aw",
      "calidad": "GenBueno",
      "stock": [
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ],
      "modelo": "iphone 6S Plus",
      "hovered": true,
      "marca": "Apple",
      "tipo": "C/M"
    },
    {
      "tipo": "Simple",
      "hovered": true,
      "calidad": "Estandar",
      "marca": "Apple",
      "modelo": "iphone 7 Plus",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 37,
      "id": "87AWh2d6OXAjZ88HmiuQ"
    },
    {
      "stock": [
        {
          "color": "Blanco",
          "cantidad": "3"
        },
        {
          "cantidad": "1",
          "color": "Negro"
        }
      ],
      "precio": 41,
      "marca": "Apple",
      "tipo": "C/M",
      "id": "27RUhTm899ggdJyECxLA",
      "hovered": true,
      "modelo": "iphone 7 Plus",
      "calidad": "GenBueno"
    },
    {
      "precio": 36,
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "calidad": "Estandar",
      "id": "SySKmWYgpzBm4QkNS0kk",
      "marca": "Apple",
      "tipo": "Simple",
      "modelo": "iphone 7G"
    },
    {
      "calidad": "GenBueno",
      "precio": 40,
      "stock": [
        {
          "cantidad": "1",
          "color": "Blanco"
        }
      ],
      "id": "po8xlm16rDfIye90ISvn",
      "marca": "Apple",
      "modelo": "iphone 7G",
      "hovered": true,
      "tipo": "C/M"
    },
    {
      "marca": "Apple",
      "id": "M5qoDRazklIcD6DVb0Gl",
      "precio": 38,
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "modelo": "iphone 8 Plus",
      "calidad": "Estandar"
    },
    {
      "id": "opZ3QvdTFxB7celrLxgq",
      "hovered": true,
      "precio": 42,
      "calidad": "GenBueno",
      "tipo": "C/M",
      "marca": "Apple",
      "stock": [
        {
          "cantidad": "1",
          "color": "Blanco"
        }
      ],
      "modelo": "iphone 8 Plus"
    },
    {
      "calidad": "Estandar",
      "id": "0q9j2vm5un9HGktgUiEc",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true,
      "precio": 30,
      "modelo": "iphone 8G",
      "marca": "Apple"
    },
    {
      "hovered": true,
      "id": "c8py4ojE3ftZ7mZWxosm",
      "marca": "Apple",
      "precio": 41,
      "calidad": "GenBueno",
      "modelo": "iphone 8G",
      "tipo": "C/M",
      "stock": [
        {
          "cantidad": "1",
          "color": "Blanco"
        }
      ]
    },
    {
      "id": "6hUi2SAxD4lQmuHKEs3a",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 62,
      "calidad": "Estandar",
      "hovered": true,
      "modelo": "iphone X",
      "tipo": "Simple",
      "marca": "Apple"
    },
    {
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "precio": 83,
      "calidad": "Original Oled",
      "id": "99corDk7OJ3rMmmKL3S8",
      "hovered": true,
      "modelo": "iphone X",
      "marca": "Apple"
    },
    {
      "precio": 25,
      "marca": "Samsung",
      "hovered": true,
      "id": "0dEiBYjIpDkReIfPEGLi",
      "tipo": "Simple",
      "modelo": "j1 ace ",
      "calidad": "AAA",
      "stock": [
        {
          "cantidad": 1,
          "color": "Blanco"
        },
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ]
    },
    {
      "modelo": "j2",
      "tipo": "Simple",
      "calidad": "AAA",
      "precio": 25,
      "id": "enrmmpQsR1ELBqC6NZqo",
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "marca": "Samsung",
      "modelo": "J2 core",
      "calidad": "Original Oled",
      "hovered": true,
      "id": "3HeD2LySKHQ980OXqQmm",
      "precio": 31,
      "tipo": "Simple"
    },
    {
      "precio": 25,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "Simple",
      "modelo": "J2 prime",
      "hovered": true,
      "marca": "Samsung",
      "id": "UpF4b8wX3JBGDa8Ub7Nd",
      "calidad": "Estandar"
    },
    {
      "tipo": "Simple",
      "id": "cqdRLXN4Si86jdtvDV88",
      "calidad": "AAA",
      "precio": 25,
      "hovered": true,
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "j2 pro"
    },
    {
      "tipo": "Simple",
      "id": "XdyF9oFtOlgGinzMBqZ3",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true,
      "marca": "Samsung",
      "calidad": "AAA",
      "modelo": "j3",
      "precio": 25
    },
    {
      "hovered": true,
      "tipo": "Simple",
      "modelo": "j3",
      "calidad": "GenBueno",
      "id": "6gj8CalpsOQWbzQ2N5Sl",
      "precio": 40,
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ]
    },
    {
      "marca": "Samsung",
      "calidad": "AAA",
      "modelo": "j4",
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Celeste"
        },
        {
          "color": "Dorado",
          "cantidad": 1
        }
      ],
      "id": "gvpUasGztwebdvkCqmEh",
      "hovered": true,
      "precio": 25
    },
    {
      "tipo": "Simple",
      "marca": "Samsung",
      "modelo": "j4",
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Dorado"
        }
      ],
      "calidad": "GenBueno",
      "precio": 35,
      "id": "puyxJBnf1UkZO3FHv58T"
    },
    {
      "hovered": true,
      "calidad": "Original Oled",
      "stock": [
        {
          "cantidad": "5",
          "color": "Celeste"
        },
        {
          "color": "Negro",
          "cantidad": "1"
        }
      ],
      "id": "19mYh3gx4nn49z9cGDx3",
      "precio": 39,
      "modelo": "j4",
      "tipo": "Simple",
      "marca": "Samsung"
    },
    {
      "marca": "Samsung",
      "id": "FvsxmeUJ25okKWx8luYE",
      "hovered": true,
      "precio": 29,
      "modelo": "J4 plus/core/prime",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "Simple",
      "calidad": "GenBueno"
    },
    {
      "calidad": "Original Oled",
      "hovered": true,
      "id": "ZYsRqZYuVly8z9q2fx4T",
      "modelo": "J4 plus/core/prime",
      "stock": [
        {
          "cantidad": "4",
          "color": "Negro"
        }
      ],
      "tipo": "Simple",
      "marca": "Samsung",
      "precio": 36
    },
    {
      "precio": 25,
      "calidad": "AAA",
      "tipo": "Simple",
      "marca": "Samsung",
      "modelo": "J5",
      "hovered": true,
      "id": "CmPRWEwFSejB3B9cCOmk",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "modelo": "J5",
      "calidad": "GenBueno",
      "marca": "Samsung",
      "id": "yFV8d3v28wovwq3j04QF",
      "hovered": true,
      "precio": 40
    },
    {
      "calidad": "GenBueno",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "marca": "Samsung",
      "id": "MR6idKEzUAx8t2IC2Mg4",
      "hovered": true,
      "tipo": "Simple",
      "modelo": "j5 2016",
      "precio": 36
    },
    {
      "marca": "Samsung",
      "hovered": true,
      "id": "v3ZqzGFgh27xCoAG0srm",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Original Oled",
      "modelo": "J5 2016",
      "precio": 49,
      "tipo": "Simple"
    },
    {
      "id": "ChwB1PsEtvJqbeg5l2HA",
      "precio": 29,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "marca": "Samsung",
      "modelo": "j5 prime",
      "tipo": "Simple",
      "calidad": "GenBueno",
      "hovered": true
    },
    {
      "precio": 35,
      "id": "zxAvAMhYXRrBOYmH6pUA",
      "tipo": "Simple",
      "calidad": "Original Oled",
      "modelo": "J5 prime",
      "marca": "Samsung",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "3"
        },
        {
          "color": "Blanco",
          "cantidad": "2"
        }
      ]
    },
    {
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "GenBueno",
      "id": "kUn9nVnWT8rZ3wx418do",
      "marca": "Samsung",
      "precio": 35,
      "tipo": "Simple",
      "modelo": "J6",
      "hovered": true
    },
    {
      "calidad": "Original Oled",
      "marca": "Samsung",
      "precio": 52,
      "modelo": "J6",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "tipo": "Simple",
      "id": "Ju3uJWsK89IqANkJrPt4"
    },
    {
      "modelo": "J6 plus/prime",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "Simple",
      "calidad": "GenBueno",
      "precio": 35,
      "marca": "Samsung",
      "id": "guRH3tRWzfaO4UIHe5fv",
      "hovered": true
    },
    {
      "hovered": true,
      "marca": "Samsung",
      "id": "6JK35nFHUEXNzEt1hUI4",
      "calidad": "Original Oled",
      "precio": 45,
      "modelo": "J6 plus/prime",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "Simple"
    },
    {
      "precio": 25,
      "calidad": "AAA",
      "modelo": "J7",
      "marca": "Samsung",
      "hovered": true,
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "wsgWBQHWhVEyQzNkuR5T"
    },
    {
      "precio": 38,
      "marca": "Samsung",
      "id": "IyyLq0GET3BIrISc0bgz",
      "hovered": true,
      "modelo": "J7",
      "stock": [
        {
          "cantidad": 1,
          "color": "Blanco"
        }
      ],
      "tipo": "Simple",
      "calidad": "GenBueno"
    },
    {
      "hovered": true,
      "id": "gRDrHN1tl8wKL6kYWrox",
      "tipo": "Simple",
      "precio": 40,
      "modelo": "J7",
      "marca": "Samsung",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "calidad": "Original Oled"
    },
    {
      "marca": "Samsung",
      "calidad": "AAA",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "TZJ0Ecame38TWGdwj3lf",
      "precio": 25,
      "modelo": "J7 2016",
      "hovered": true,
      "tipo": "Simple"
    },
    {
      "precio": 37,
      "hovered": true,
      "tipo": "Simple",
      "id": "6HmECsXomhWx2WeyHryo",
      "marca": "Samsung",
      "modelo": "J7 2016",
      "calidad": "GenBueno",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "marca": "Samsung",
      "precio": 41,
      "hovered": true,
      "stock": [
        {
          "color": "Blanco",
          "cantidad": "2"
        },
        {
          "color": "Negro",
          "cantidad": "2"
        },
        {
          "cantidad": "1",
          "color": "Dorado"
        }
      ],
      "id": "usDADLmnRNvy6wrKwbRu",
      "calidad": "Original Oled",
      "modelo": "J7 2016",
      "tipo": "Simple"
    },
    {
      "modelo": "J7 Neo",
      "hovered": true,
      "id": "5F6S6rz7qf1kw0hoR1e5",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        },
        {
          "color": "Blanco",
          "cantidad": 1
        }
      ],
      "marca": "Samsung",
      "tipo": "Simple",
      "precio": 25,
      "calidad": "AAA"
    },
    {
      "hovered": true,
      "modelo": "J7 Neo",
      "calidad": "GenBueno",
      "marca": "Samsung",
      "tipo": "Simple",
      "id": "Tom1D4sNB48ALgNoCzyD",
      "precio": 38,
      "stock": [
        {
          "cantidad": 1,
          "color": "Blanco"
        },
        {
          "color": "Dorado",
          "cantidad": 1
        },
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ]
    },
    {
      "marca": "Samsung",
      "precio": 40,
      "id": "xbup73HfrSEPdBGihFTt",
      "modelo": "J7 Neo",
      "calidad": "Original Oled",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 1
        },
        {
          "color": "Dorado",
          "cantidad": 1
        },
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ],
      "hovered": true,
      "tipo": "Simple"
    },
    {
      "calidad": "AAA",
      "tipo": "Simple",
      "modelo": "J7 Prime",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        },
        {
          "cantidad": "2",
          "color": "Blanco"
        }
      ],
      "precio": 29,
      "marca": "Samsung",
      "id": "bPwSi0a2gDF3cM8rzhfs",
      "hovered": true
    },
    {
      "modelo": "J7 Prime",
      "precio": 32,
      "tipo": "Simple",
      "calidad": "GenBueno",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "id": "9WXjytKqoqGzHbJRuWpI",
      "marca": "Samsung"
    },
    {
      "tipo": "Simple",
      "hovered": true,
      "precio": 35,
      "modelo": "J7 Prime",
      "calidad": "Original Oled",
      "marca": "Samsung",
      "id": "eVf1nSNL1TaeyC8ZgMWZ",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": "2"
        },
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ]
    },
    {
      "modelo": "J7 Pro",
      "precio": 25,
      "calidad": "AAA",
      "stock": [
        {
          "cantidad": 1,
          "color": "Dorado"
        },
        {
          "color": "Celeste",
          "cantidad": 1
        },
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "tipo": "Simple",
      "id": "dlR8zTG2qSIc9uPNjMVH",
      "marca": "Samsung",
      "hovered": true
    },
    {
      "modelo": "J7 Pro",
      "id": "ELxmzsyIdOmNqg81ANIO",
      "marca": "Samsung",
      "tipo": "Simple",
      "calidad": "GenBueno",
      "hovered": true,
      "precio": 38,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ]
    },
    {
      "calidad": "Original Oled",
      "precio": 40,
      "hovered": true,
      "id": "IKkPHJN3aLuN3z3jSa0Q",
      "tipo": "Simple",
      "modelo": "J7 Pro",
      "marca": "Samsung",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "precio": 41,
      "calidad": "GenBueno",
      "tipo": "Simple",
      "id": "t4Z7epuxhPFbXkZW59qb",
      "hovered": true,
      "modelo": "J8",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "marca": "Samsung"
    },
    {
      "id": "Vt5ne563DhchfKRVxYrV",
      "tipo": "Simple",
      "calidad": "Original Oled",
      "marca": "Samsung",
      "hovered": true,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "J8",
      "precio": 47
    },
    {
      "tipo": "Simple",
      "precio": 34,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Estandar",
      "id": "jW22Se6mnZV4gaEyPXbF",
      "modelo": "K10 2017",
      "hovered": true,
      "marca": "LG"
    },
    {
      "modelo": "K10 TV",
      "marca": "LG",
      "precio": 34,
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "tipo": "Simple",
      "hovered": true,
      "calidad": "Estandar",
      "id": "9xBLMl6PegByF4kIALOl"
    },
    {
      "calidad": "Estandar",
      "modelo": "K11",
      "marca": "LG",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "2iNc3bJJfSlB8bAUZVxW",
      "hovered": true,
      "precio": 34
    },
    {
      "tipo": "Simple",
      "marca": "LG",
      "id": "hAoRJff6xKoDSB4VtCBK",
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "precio": 40,
      "hovered": true,
      "modelo": "K11 + Plus"
    },
    {
      "hovered": true,
      "calidad": "Estandar",
      "precio": 41,
      "marca": "LG",
      "modelo": "k22 plus",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "TtlKWrOW2sKvciaabo13",
      "tipo": "Simple"
    },
    {
      "marca": "LG",
      "modelo": "K4 2017",
      "precio": 29,
      "calidad": "Estandar",
      "tipo": "Simple",
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "EyYMo7OxX2Nw2Ta8RFyY"
    },
    {
      "precio": 40,
      "id": "UBOpdx8hGbDvQm37jaRb",
      "calidad": "Estandar",
      "modelo": "k40",
      "marca": "LG",
      "tipo": "C/M",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "hovered": true
    },
    {
      "hovered": true,
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "marca": "LG",
      "calidad": "Estandar",
      "modelo": "k40s",
      "id": "RCWsNUiqLd2GPjuxYRjl",
      "tipo": "Simple",
      "precio": 37
    },
    {
      "marca": "Samsung",
      "tipo": "Simple",
      "hovered": true,
      "calidad": "Estandar",
      "modelo": "k41s",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "precio": 40,
      "id": "U2YQqwE4hNHXysAWxQCf"
    },
    {
      "hovered": true,
      "marca": "LG",
      "modelo": "K50 / Q60",
      "precio": 35,
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "id": "NSR8ae9qdVtBGXLLFgJn",
      "tipo": "C/M"
    },
    {
      "id": "6FmgKqgHcj5me2jm1FEx",
      "calidad": "Estandar",
      "hovered": true,
      "modelo": "K50S",
      "marca": "LG",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "3"
        }
      ],
      "precio": 38,
      "tipo": "Simple"
    },
    {
      "precio": 30,
      "tipo": "Simple",
      "calidad": "Estandar",
      "modelo": "K8",
      "stock": [
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ],
      "hovered": true,
      "marca": "LG",
      "id": "BaSxjRh8oFJ26lf0n7kx"
    },
    {
      "hovered": true,
      "tipo": "Simple",
      "modelo": "K8 2017",
      "precio": 31,
      "calidad": "Estandar",
      "marca": "LG",
      "id": "MF5sZKpKP50FrbV5dcOE",
      "stock": [
        {
          "cantidad": "2",
          "color": "Negro"
        }
      ]
    },
    {
      "marca": "LG",
      "id": "Z9RlUgcD2AiedW8m3vls",
      "precio": 31,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "calidad": "Estandar",
      "modelo": "K9",
      "tipo": "Simple",
      "hovered": true
    },
    {
      "tipo": "Simple",
      "precio": 35,
      "id": "THjiN6Xx3cpHGIXAlAG0",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "calidad": "Estandar",
      "hovered": true,
      "marca": "LG",
      "modelo": "Leon"
    },
    {
      "precio": 37,
      "hovered": true,
      "tipo": "Simple",
      "marca": "LG",
      "id": "GvUIdjZvNcD9nj6wHzUg",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "calidad": "Estandar",
      "modelo": "lg k22"
    },
    {
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "EGW4CngLyk3yiJiZArWt",
      "hovered": true,
      "calidad": "Estandar",
      "modelo": "Lg Q6",
      "marca": "LG",
      "tipo": "Simple",
      "precio": 41.5
    },
    {
      "tipo": "C/M",
      "modelo": "M12",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "marca": "Samsung",
      "calidad": "Estandar",
      "id": "dqFKPESrXT4SNWtaAIAE",
      "hovered": true,
      "precio": 47
    },
    {
      "precio": 41,
      "calidad": "Estandar",
      "modelo": "Mate 10 Lite",
      "hovered": true,
      "id": "TzturTayqUFN3VePbMUd",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "marca": "Huawei",
      "tipo": "Simple"
    },
    {
      "tipo": "Simple",
      "calidad": "Estandar",
      "modelo": "mi 8 lite",
      "id": "8pocER1g9HsjVDaPOyrx",
      "marca": "Xiaomi",
      "hovered": true,
      "precio": 39.5,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ]
    },
    {
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "Mi A1",
      "tipo": "Simple",
      "marca": "Xiaomi",
      "hovered": true,
      "id": "ePGjeeUwqNhwT9vpRoyV",
      "calidad": "Estandar",
      "precio": 39
    },
    {
      "tipo": "Simple",
      "calidad": "Estandar",
      "precio": 31,
      "modelo": "moto C",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "S7PMLt1x1Cfeg7cRqNJe",
      "marca": "Motorola",
      "hovered": true
    },
    {
      "calidad": "Estandar",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "tipo": "Simple",
      "precio": 29,
      "modelo": "moto E",
      "id": "52VPNb9llAGQWwEOvdAZ",
      "hovered": true,
      "marca": "Motorola"
    },
    {
      "id": "YWrBpgvKy2938gS7Fb6S",
      "tipo": "Simple",
      "precio": 25,
      "marca": "Motorola",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "moto E2",
      "hovered": true,
      "calidad": "Estandar"
    },
    {
      "id": "4UimBsBuC44409um1etb",
      "marca": "Motorola",
      "modelo": "moto e20",
      "calidad": "Estandar",
      "hovered": true,
      "tipo": "Simple",
      "precio": 37,
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ]
    },
    {
      "calidad": "Estandar",
      "precio": 32,
      "id": "7EmjisLIGr38fBgg2TFB",
      "modelo": "moto E4",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "hovered": true,
      "marca": "Motorola",
      "tipo": "Simple"
    },
    {
      "modelo": "moto e40",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "precio": 35,
      "calidad": "Estandar",
      "hovered": true,
      "tipo": "Simple",
      "marca": "Motorola",
      "id": "35nhFJKOPDs1trBh7WUm"
    },
    {
      "calidad": "Estandar",
      "tipo": "Simple",
      "marca": "Samsung",
      "precio": 30,
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "modelo": "Moto e5 / g6 play",
      "id": "uamFZLjmkJ7xq6BcRxRu"
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Dorado"
        }
      ],
      "modelo": "Moto e5 / g6 play",
      "calidad": "Estandar",
      "tipo": "C/M",
      "marca": "Motorola",
      "hovered": true,
      "id": "0VUma8CEpoAIq62tvGUV",
      "precio": 32
    },
    {
      "modelo": "Moto e6i",
      "hovered": true,
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "marca": "Motorola",
      "calidad": "Estandar",
      "id": "yXHpri5HkQA72VoRmFE9",
      "precio": 40
    },
    {
      "id": "23nqUASz3bQ8yjG0jmvP",
      "hovered": true,
      "marca": "Motorola",
      "modelo": "moto G",
      "calidad": "Estandar",
      "tipo": "Simple",
      "precio": 28,
      "stock": []
    },
    {
      "marca": "Motorola",
      "precio": 33,
      "tipo": "Simple",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "modelo": "moto G22",
      "calidad": "GenBueno",
      "id": "j7EAHL3l8K0tEOsHaBMf"
    },
    {
      "modelo": "moto G22",
      "precio": 38,
      "calidad": "Estandar",
      "marca": "Motorola",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "id": "9bnYEF51H2zLD34fm5oZ"
    },
    {
      "precio": 52,
      "calidad": "Original Oled",
      "tipo": "C/M",
      "marca": "Motorola",
      "modelo": "moto G22",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "id": "to8EXmecMwNSrc5pPbXI"
    },
    {
      "id": "Q4oToWh9wTOZFh5Bp7wJ",
      "marca": "Motorola",
      "calidad": "Estandar",
      "hovered": true,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "precio": 39,
      "modelo": "Moto G30",
      "tipo": "Simple"
    },
    {
      "modelo": "moto G31 - G41 - G71",
      "tipo": "Simple",
      "marca": "Motorola",
      "precio": 59,
      "hovered": true,
      "calidad": "Estandar",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "0QQN4ixl4vPGyNXNusXJ"
    },
    {
      "modelo": "moto g50",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "tipo": "Simple",
      "precio": 45,
      "marca": "Motorola",
      "calidad": "Estandar",
      "id": "p6cmzUMeoqxfCfZC5Q0S"
    },
    {
      "precio": 48,
      "calidad": "Estandar",
      "modelo": "moto g51",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "tipo": "Simple",
      "marca": "Motorola",
      "id": "4KsgdBvo8f9mL7okDZu3"
    },
    {
      "modelo": "moto g60s",
      "precio": 49,
      "marca": "Motorola",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "calidad": "Estandar",
      "tipo": "Simple",
      "id": "zjyFqeSc0lfajUQvred6"
    },
    {
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "calidad": "Estandar",
      "tipo": "Simple",
      "precio": 60,
      "modelo": "moto g71",
      "marca": "Motorola",
      "id": "NEhPIWFbVXqi8bPuxwWO"
    },
    {
      "id": "BoKan4riTHrcLz35OokX",
      "tipo": "Simple",
      "precio": 44,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "modelo": "moto one",
      "calidad": "Estandar",
      "marca": "Motorola"
    },
    {
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 38,
      "tipo": "Simple",
      "marca": "Motorola",
      "calidad": "Estandar",
      "hovered": true,
      "id": "LxTyxBvjErUfL3kYoQ7o",
      "modelo": "moto one Macro / g8 play"
    },
    {
      "hovered": true,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        },
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "moto x2",
      "precio": 31.6,
      "calidad": "Estandar",
      "tipo": "C/M",
      "marca": "Motorola",
      "id": "tlQ8vu0fuzmQoYKeJv1c"
    },
    {
      "precio": 43,
      "modelo": "note 7 pro",
      "marca": "Xiaomi",
      "tipo": "Simple",
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "id": "QJoXgdt6yWbwBtjEUoyF"
    },
    {
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "4e4QeTWzTuItZIRKeLJa",
      "calidad": "Estandar",
      "precio": 41.8,
      "marca": "Xiaomi",
      "tipo": "Simple",
      "modelo": "Note 8",
      "hovered": true
    },
    {
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "id": "jFKDyzn4wgCYMIvD9tQq",
      "precio": 57,
      "marca": "Motorola",
      "hovered": true,
      "tipo": "Simple",
      "modelo": "One Action / vision",
      "calidad": "Estandar"
    },
    {
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "modelo": "One Vision / Action",
      "hovered": true,
      "precio": 57,
      "id": "DkduGvRhxklCHhtD8WfQ",
      "tipo": "Simple",
      "marca": "Motorola"
    },
    {
      "marca": "Huawei",
      "calidad": "Estandar",
      "tipo": "Simple",
      "precio": 45.2,
      "modelo": "P10",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "k7vV3MgQ5QlK1tH6UVME"
    },
    {
      "hovered": true,
      "marca": "Huawei",
      "tipo": "Simple",
      "precio": 27,
      "stock": [
        {
          "cantidad": "1",
          "color": "Blanco"
        }
      ],
      "calidad": "Estandar",
      "modelo": "p8 lite",
      "id": "uUrIZTXtXeDUBoFRWelE"
    },
    {
      "id": "SEo6wDGOK00Sw5qDmYx2",
      "precio": 35,
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "marca": "LG",
      "hovered": true,
      "modelo": "Q60 / K50",
      "calidad": "Estandar",
      "tipo": "Simple"
    },
    {
      "calidad": "Estandar",
      "precio": 41.8,
      "marca": "Xiaomi",
      "modelo": "redmi 8",
      "tipo": "Simple",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "id": "4C7hBQ7gqZX8j2oNtG18"
    },
    {
      "modelo": "Redmi Go",
      "marca": "Xiaomi",
      "precio": 32,
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "hovered": true,
      "tipo": "Simple",
      "calidad": "Estandar",
      "id": "YmEYOwnWRTyIl1nw7y5v"
    },
    {
      "modelo": "Redmi Note 6",
      "id": "zupPwFa81B5uAEka4uyw",
      "calidad": "Estandar",
      "precio": 39,
      "hovered": true,
      "marca": "Xiaomi",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "tipo": "Simple"
    },
    {
      "modelo": "redmi note 9",
      "tipo": "Simple",
      "calidad": "Estandar",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "precio": 41.8,
      "marca": "Xiaomi",
      "id": "HDrgV3ZjDArpwAg4eaDZ"
    },
    {
      "tipo": "Simple",
      "marca": "Samsung",
      "precio": 80,
      "calidad": "Estandar",
      "modelo": "S20FE",
      "stock": [
        {
          "color": "Blanco",
          "cantidad": 0
        }
      ],
      "id": "bUaEUn8mEQ0l8K7F8kIW"
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "id": "jUars6y5qAP2n0uMZGg1",
      "calidad": "Original Oled",
      "modelo": "S8",
      "marca": "Samsung",
      "precio": 125,
      "tipo": "C/M",
      "hovered": true
    },
    {
      "calidad": "Original Oled",
      "marca": "Samsung",
      "hovered": true,
      "id": "7JS0qET000FsCdaoBTxf",
      "precio": 177,
      "tipo": "C/M",
      "modelo": "S8 Plus",
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ]
    },
    {
      "modelo": "S9",
      "marca": "Samsung",
      "hovered": true,
      "tipo": "C/M",
      "precio": 182,
      "id": "SqsULeIQtnpyMMTsSlSr",
      "calidad": "Original Oled",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ]
    },
    {
      "tipo": "C/M",
      "modelo": "Samsung A12",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "GenBueno",
      "precio": 40,
      "hovered": true,
      "id": "5RcRjYcX7Ubhxouh4Hg6",
      "marca": "Samsung"
    },
    {
      "marca": "LG",
      "stock": [
        {
          "cantidad": 0,
          "color": "Blanco"
        }
      ],
      "modelo": "spirit",
      "calidad": "Estandar",
      "id": "PMLSc9uwuMGa2bAIMnGx",
      "precio": 32,
      "hovered": true,
      "tipo": "Simple"
    },
    {
      "modelo": "X Play",
      "tipo": "Simple",
      "hovered": true,
      "marca": "Motorola",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "id": "WP2BZrwNz7FWKfP8RQRA",
      "precio": 37,
      "calidad": "Estandar"
    },
    {
      "id": "TfKxNyQ8ZJF0cVGmZNDZ",
      "marca": "Motorola",
      "hovered": true,
      "calidad": "Estandar",
      "tipo": "Simple",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 47,
      "modelo": "X Style"
    },
    {
      "modelo": "xiaomi Note 5",
      "hovered": true,
      "stock": [
        {
          "cantidad": 1,
          "color": "Blanco"
        }
      ],
      "tipo": "Simple",
      "id": "H4HKTou0NbdyFUq0Pc3y",
      "calidad": "Estandar",
      "precio": 38,
      "marca": "Xiaomi"
    },
    {
      "hovered": true,
      "marca": "Xiaomi",
      "modelo": "xiaomi Note 7",
      "precio": 55,
      "id": "WEhQCwrrf2JsTDESkHS2",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "calidad": "Estandar",
      "tipo": "Simple"
    },
    {
      "calidad": "Estandar",
      "marca": "Xiaomi",
      "id": "n3yocqVurY0QBCX59OQd",
      "modelo": "xiaomi Note 8 t",
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "precio": 40,
      "hovered": true,
      "tipo": "Simple"
    },
    {
      "stock": [
        {
          "cantidad": 1,
          "color": "Negro"
        }
      ],
      "modelo": "Y6 2 / GW",
      "precio": 34,
      "marca": "Huawei",
      "id": "eMrVgd5kfmMbAiipiKCx",
      "calidad": "Estandar",
      "tipo": "Simple",
      "hovered": true
    },
    {
      "stock": [
        {
          "color": "Negro",
          "cantidad": 1
        }
      ],
      "marca": "Motorola",
      "calidad": "Estandar",
      "tipo": "Simple",
      "precio": 42,
      "hovered": true,
      "modelo": "Z Play",
      "id": "1XZxzTEfWxXZ5E8dTbKP"
    },
    {
      "precio": 48,
      "calidad": "Estandar",
      "hovered": true,
      "id": "GOwxO9yIjRq5DoopQprO",
      "stock": [
        {
          "color": "Negro",
          "cantidad": "2"
        }
      ],
      "marca": "Motorola",
      "modelo": "Z2 Play",
      "tipo": "Simple"
    },
    {
      "tipo": "Simple",
      "stock": [],
      "id": "cQvyDzwOIYkLIExAUAFR",
      "modelo": "Z3 Play",
      "calidad": "Estandar",
      "marca": "Motorola",
      "hovered": true,
      "precio": 47
    }
  ];//[];
  modulosAMostrar = [];

  precioDolarBlue: number | null = null;
  mostrarFormModulo = true;

  dolarObservable$: Observable<number> | null = null;
  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController) {

    this.getCurrentUser();
    this.modulosAMostrar = [...this.modulos];
  }
  ngOnInit(): void {
    console.log(this.modulos)
    return;
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }

    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.modulos).subscribe((docsModulosRef) => {
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      console.log(lista)
      this.modulos = lista;
      this.modulosAMostrar = [...this.modulos];
    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(modulo: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleModuloComponent,
        componentProps: {
          repuesto: modulo
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.dataBase.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
      })
    })
  }
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.modulosAMostrar = this.modulos.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }


  async abrirFormModulo() {
    try {
      const modal = await this.modalController.create({
        component: FormModuloComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

}