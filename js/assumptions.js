const $pluginsFilter = document.querySelector("#assumptions-filter");
const $assumptionsList = document.querySelector("#assumptions-list");
const $assumptions = $assumptionsList.querySelectorAll(".assumption-container");

const toggle = (root, selector, show) => {
  console.log("set", selector, show ? "auto" : "none");
  root.querySelector(selector).style.display = show ? "block" : "none";
};

$assumptionsList.addEventListener("change", e => {
  const enabled = e.target.checked;
  const $container = e.target.closest(".assumption-container");

  toggle($container, ".assumption-output-enabled", enabled);
  toggle($container, ".assumption-output-disabled", !enabled);
});

const assumptionsToPlugins = new Map();
const enabledPlugins = new Set();
for (const { name, plugins } of window.ASSUMPTIONS_LIST) {
  assumptionsToPlugins.set(name, plugins);
  for (const plugin of plugins) enabledPlugins.add(plugin);
}

for (const plugin of Array.from(enabledPlugins).sort()) {
  const $li = document.createElement("li");
  const $label = document.createElement("label");
  const $input = document.createElement("input");
  $input.type = "checkbox";
  $input.checked = true;
  $input.dataset.plugin = plugin;

  $li.appendChild($label);
  $label.appendChild($input);
  $label.appendChild(document.createTextNode(plugin));

  $pluginsFilter.appendChild($li);
}

$pluginsFilter.addEventListener("change", e => {
  const enabled = e.target.checked;
  const { plugin } = e.target.dataset;

  if (enabled) enabledPlugins.add(plugin);
  else enabledPlugins.delete(plugin);

  for (const $assumption of $assumptions) {
    const plugins = assumptionsToPlugins.get($assumption.dataset.assumption);
    const show = plugins.some(plugin => enabledPlugins.has(plugin));
    $assumption.style.display = show ? "block" : "none";
  }
});
