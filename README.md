**HttpClientJS**

HttpClientJS es una pequeña y liviana librería de JavaScript para facilitar el fetching de datos.

# Uso

## Inicialización

Para utilizar HttpClientJS, primero debes importarlo en tu script y luego llamar a uno de sus métodos:

```javascript
import { HttpClient } from "https://cdn.devetty.es/HttpClientJS/js";

HttpClient.get("https://api.es/example", (result) => {
  // result.status -> true/false
  // result.data -> the content
});

HttpClient.post("https://api.es/example", { id: "1", name: "Test" }, (result) => {
  // result.status -> true/false
  // result.data -> the content
});
```
