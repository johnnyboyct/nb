[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jifalops/screen-env)

# screen-env
Differentiate screen types by size, touch ability, and more.

## Installation
```
bower install --save screen-env
```

## Usage
* Bind to the `screen-env` properties you are interested in.

## Demo
<!--
```
<custom-element-demo>
  <template is="dom-bind">
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="screen-env.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<screen-env
  narrow-width="{{narrowWidth}}"
  is-touch="{{isTouch}}"
  ua-is-desktop="{{uaIsDesktop}}"
  is-mobile="{{isMobile}}">
</screen-env>
<table border="1">
  <tr><th colspan="3">Main abilities</th></tr>
  <tr><td>narrowWidth</td><th>[[narrowWidth]]</th>
      <td>Mobile/tablet+, (600px or less)</td></tr>
  <tr><td>isTouch</td><th>[[isTouch]]</th>
      <td>false: no browser support<br/>
          null: browser support<br/>
          true: touchstart has occurred</td></tr>
  <tr><td>uaIsDesktop</td><th>[[uaIsDesktop]]</th>
      <td>User requested desktop site</td></tr>
  <tr><td>isMobile</td><th>[[isMobile]]</th>
      <td>Material design + UA/media check</td></tr>
  </table>
```

Full demo:
[webcomponents.org](https://www.webcomponents.org/element/jifalops/screen-env/demo/demo/index.html)
| [github](https://jifalops.github.io/screen-env/components/screen-env/demo/).

API: [webcomponents.org](https://www.webcomponents.org/element/jifalops/screen-env/screen-env)
| [github](https://jifalops.github.io/screen-env).

## Contributing

1. Fork it on Github.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[MIT](https://opensource.org/licenses/MIT)
