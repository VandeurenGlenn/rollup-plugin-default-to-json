export default function() {
  return {
    name: 'default-to-json',
    generateBundle(outputOptions, bundle) {
      const entry = Object.values(bundle).find((chunk) => chunk.isEntry);
      const func = new Function(
        `return ${entry.code.toString().replace('var', '').replace(/export { ([A-Z]|[a-z])\w+ as default };/g, '').trimEnd()}`
      )
      this.emitFile({
        type: 'asset',
        fileName: 'networks.json',
        source: JSON.stringify(func(), null, '\t')
      })
    }
  }  
}