---
title: p5modLibrary docs
---

**src/mo-pixel-grid** example uses the library in the **lib** directory.

The <SwmPath>[src/demos/mo-pixel-grid/index.html](/src/demos/mo-pixel-grid/index.html)</SwmPath> includes the library. When the script is in p5js editor, this link will be directly to the github pages for the library.

The query append to each src= reference in index file is to force reload from the cache for github pages or other deploy.

Access to firebase begins in mo-pixel-grid / a_sketch.js with the fb\_.init call. There are two free firebase config accounts that you can use `jht1493` or `jht9629` . If one goes over quota, switch to the other or create your own firebase account and pass the config object to fb\_.init !!@ need example of this

<SwmSnippet path="src/demos/mo-pixel-grid/a_sketch.js" line="27">

---

This code snippet initializes the `config` variable with the `fb_.init()` function, passing a string argument `'jht9629'` or `'jht1493'`.

```
  let config = fb_.init('jht9629');
  // let config = fb_.init('jht1493');
```

---

</SwmSnippet>

&nbsp;

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcDVtb0xpYnJhcnklM0ElM0Ftb2xhYi1pdHA=" repo-name="p5moLibrary"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
