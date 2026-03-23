import { z } from "zod"
import { selectionToolbarCustomActionOutputTypeSchema } from "@/types/config/selection-toolbar"

interface Field { name: string, type: string, description?: string }

const outputTypeWithDefault = selectionToolbarCustomActionOutputTypeSchema.catch("string")

export function buildOutputZodSchema(fields: Field[]) {
  const shape = Object.fromEntries(
    fields.map((f) => {
      const type = outputTypeWithDefault.parse(f.type)
      const schema = z[type]().nullable()
      if (f.description) {
        schema.describe(f.description)
      }
      return [f.name, schema]
    }),
  )

  return z.strictObject(shape)
}
