const dedent = ([str]) => {
  const len = str.match(/^[\n\r]+([^\S\n\r]+)/)[1].length;
  return str.replace(new RegExp(`^[^\\S\\n\\r]{0,${len}}`, "gm"), "").trim();
};

// NOTE: outputEnabled, outputDisabled and targets could be computed at build time

module.exports = [
  {
    name: "noDocumentAll",
    description:
      "When using operators that check for `null` or `undefined`, assume that they are never used with the special value `document.all`",
    input: dedent`
      let score = points ?? 0;
      let name = user?.name;
    `,
    outputEnabled: dedent`
      var _points, _user;

      let score = (_points = points) != null ? _points : 0;
      let name = (_user = user) == null ? void 0 : _user.name;
    `,
    outputDisabled: dedent`
      var _points, _user;

      let score = (_points = points) !== null && _points !== void 0 ? _points : 0;
      let name = (_user = user) === null || _user === void 0 ? void 0 : _user.name;
    `,
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
    ],
    targets: {
      chrome: "80",
      opera: "67",
      edge: "80",
      firefox: "72",
      safari: "13.1",
      node: "14",
      ios: "13.4",
      samsung: "13",
      electron: "8.0",
    },
  },
  {
    name: "privateFieldsAsProperties",
    description:
      "Convert private fields to non-enumerable public properties with an unique name, rather than using `WeakMap` to provide true privacy. This can provide better performance and makes it easier to debug compiled private fields.",
    input: dedent`
      class Person {
        #name;

        constructor(name) {
          this.#name = name;
        }
      }
    `,
    outputEnabled: dedent`
      import _classPrivateFieldLooseBase from "@babel/runtime/helpers/classPrivateFieldLooseBase";
      import _classPrivateFieldLooseKey from "@babel/runtime/helpers/classPrivateFieldLooseKey";

      var _name = _classPrivateFieldLooseKey("name");

      class Person {
        constructor(name) {
          Object.defineProperty(this, _name, {
            writable: true,
            value: void 0
          });
          _classPrivateFieldLooseBase(this, _name)[_name] = name;
        }

      }
    `,
    outputDisabled: dedent`
      import _classPrivateFieldSet from "@babel/runtime/helpers/classPrivateFieldSet";

      var _name = new WeakMap();

      class Person {
        constructor(name) {
          _name.set(this, {
            writable: true,
            value: void 0
          });

          _classPrivateFieldSet(this, _name, name);
        }

      }
    `,
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
    ],
    targets: {
      chrome: "74",
      opera: "62",
      edge: "79",
      node: "12",
      samsung: "11",
      electron: "6.0",
    },
  },
];
