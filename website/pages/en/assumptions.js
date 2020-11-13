const React = require("react");

const ASSUMPTIONS = require(process.cwd() + "/data/assumptions");
const siteConfig = require(process.cwd() + "/siteConfig.js");

const AssumptionSummary = ({ assumption }) => {
  return (
    <div className="assumption-container" data-assumption={assumption.name}>
      <h3>
        <code>{assumption.name}</code>
      </h3>

      <label>
        <input className="assumption-toggle" type="checkbox" />
        Enabled
      </label>

      <p>{assumption.description}</p>

      <table>
        <thead>
          <tr>
            <th>Input</th>
            <th>Output</th>
          </tr>
        </thead>
        <tr>
          <td>
            <pre>
              <code>{assumption.input}</code>
            </pre>
          </td>
          <td>
            <pre
              className="assumption-output-enabled"
              style={{ display: "none" }}
            >
              <code>{assumption.outputEnabled}</code>
            </pre>
            <pre
              className="assumption-output-disabled"
              style={{ display: "auto" }}
            >
              <code>{assumption.outputDisabled}</code>
            </pre>
          </td>
        </tr>
      </table>

      <h4>Affected plugins:</h4>
      <ul>
        {assumption.plugins.map(plugin => (
          <li key={plugin}>{plugin}</li>
        ))}
      </ul>
    </div>
  );
};

const AssumptionsPage = () => {
  return (
    <React.Fragment>
      <div className="mainContainer">
        <h1>Assumptions</h1>

        <details>
          <summary>
            Only show assumptions that affects the following plugins:{" "}
            <i>(click to expand)</i>
          </summary>

          <ul id="assumptions-filter" />
        </details>

        <div id="assumptions-list">
          {ASSUMPTIONS.map(assumption => (
            <AssumptionSummary key={assumption.name} assumption={assumption} />
          ))}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `window.ASSUMPTIONS_LIST = ${JSON.stringify(ASSUMPTIONS)};`,
        }}
      />

      <script
        src={`${siteConfig.baseUrl}js/build/assumptions.js`}
        defer={true}
      />
    </React.Fragment>
  );
};

module.exports = AssumptionsPage;
