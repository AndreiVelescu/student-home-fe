import z from "zod";
const fileItemSchema = z.object({
  file: z.instanceof(File),
  preview: z.string(),
  title: z.string(),
  description: z.string(),
  fileType: z.enum(["", "BuletinFront", "BuletinBack", "ConfirmareStudii"]),
});

export const formSchema = z.object({
  firstName: z.string().min(1, { message: "Prenumele este obligatoriu" }),
  lastName: z.string().min(1, { message: "Numele este obligatoriu" }),
  email: z.string().email({ message: "Adresa de email este invalidă" }),
  phone: z.string().min(1, { message: "Numărul de telefon este obligatoriu" }),
  address: z.string().min(1, { message: "Adresa este obligatorie" }),
  city: z.string().min(1, { message: "Orașul este obligatoriu" }),

  university: z.string().min(1, { message: "Universitatea este obligatorie" }),
  dormitoryPreference: z
    .string()
    .min(1, { message: "Preferința pentru cămin este obligatorie" }),

  files: z
    .array(fileItemSchema)
    .min(1, { message: "Trebuie să încarci cel puțin un document" })
    .refine((files) => files.some((file) => file.fileType === "BuletinFront"), {
      message: "Buletin (față) este obligatoriu",
    })
    .refine((files) => files.some((file) => file.fileType === "BuletinBack"), {
      message: "Buletin (verso) este obligatoriu",
    })
    .refine(
      (files) => files.some((file) => file.fileType === "ConfirmareStudii"),
      {
        message: "Confirmarea studiilor este obligatorie",
      }
    ),
  terms: z.boolean().refine((val) => val === true, {
    message: "Trebuie să accepți termenii și condițiile",
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
