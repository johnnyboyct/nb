[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jifalops/geo-query-input)

# geo-query-input
Specify the center point and search radius for geographical queries.

## Installation

```
bower install --save geo-query-input
```

## Usage
* Listen for the `query-changed` event and handle changes.
* Optionally use a submit button instead of the query-changed event (see full demo).

## Demo
<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="geo-query-input.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<geo-query-input id="queryInput"></geo-query-input>
<div id="query"></div>
<script>
  var input = document.getElementById('queryInput');
  var query = document.getElementById('query');
  input.addEventListener('query-changed', function(e) {
    var data = e.detail;
    query.innerHTML = 'Query:'
      + '<br>useCurrentLocation: ' + data.useCurrentLocation
      + '<br>search: ' + data.search
      + '<br>radiusKm: ' + data.radiusKm;
  });
</script>
```

Full demo:
[webcomponents.org](https://www.webcomponents.org/element/jifalops/geo-query-input/demo/demo/index.html)
| [github](https://jifalops.github.io/geo-query-input/components/geo-query-input/demo/).

API: [webcomponents.org](https://www.webcomponents.org/element/jifalops/geo-query-input/geo-query-input)
| [github](https://jifalops.github.io/geo-query-input).


## Contributing

1. Fork it on Github.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[MIT](https://opensource.org/licenses/MIT)
