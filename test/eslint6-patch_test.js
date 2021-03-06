const expect = require("chai").expect
const sinon = require("sinon")

const { ConfigArrayFactory } = require("eslint/lib/cli-engine/config-array-factory")
const { ConfigArray } = require("eslint/lib/cli-engine/config-array")

const eslintPatch = require("../lib/eslint6-patch")

/**
 * Proper behavior is tested through integration tests.
 * This is just a quick smoke test to tell patch is working.
 */
describe("eslint6-patch", function() {
  describe("patch", function() {
    let originalLoadPlugin, originalExtractConfig

    before(function() {
      originalLoadPlugin = ConfigArrayFactory.prototype._loadPlugin
      originalExtractConfig = ConfigArray.prototype.extractConfig
    })

    it("intercepts plugin loading", function() {
      eslintPatch()
      expect(originalLoadPlugin).to.not.equal(
        ConfigArrayFactory.prototype._loadPlugin,
        "ConfigArrayFactory._loadPlugin is not patched"
      )
    })

    it("intercepts rule configs", function() {
      eslintPatch()
      expect(originalExtractConfig).to.not.equal(
        ConfigArray.prototype.extractConfig,
        "ConfigArray.prototype.extractConfig is not patched"
      )
    })
  })
})
