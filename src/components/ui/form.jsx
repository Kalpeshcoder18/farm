// // FormComponents.jsx
// import React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";
// import { cn } from "./utils"; // your helper
// import { Label } from "./label"; // your Label component

// export const Form = FormProvider;

// // contexts (default null so we can guard)
// const FormFieldContext = React.createContext(null);
// const FormItemContext = React.createContext(null);

// /** FormField
//  * Usage: <FormField name="firstName" control={methods.control} rules={{...}} render={({ field }) => ( <FormItem> ... )} />
//  */
// export function FormField(props) {
//   const { name } = props;
//   if (!name) throw new Error("FormField: `name` is required");

//   return (
//     <FormFieldContext.Provider value={{ name }}>
//       <Controller {...props} />
//     </FormFieldContext.Provider>
//   );
// }

// export function useFormField() {
//   const fieldContext = React.useContext(FormFieldContext);
//   if (!fieldContext) {
//     throw new Error("useFormField must be used within a <FormField>");
//   }

//   const itemContext = React.useContext(FormItemContext);

//   // ensure RHF FormProvider exists
//   const methods = useFormContext();
//   if (!methods) {
//     throw new Error("useFormField must be used inside react-hook-form <FormProvider>");
//   }

//   // stable id fallback using useId
//   const fallbackId = React.useId ? React.useId() : `form-${String(fieldContext.name)}`;

//   // subscribe to field-specific state
//   const formState = useFormState({ control: methods.control, name: fieldContext.name });
//   const getFieldState = methods.getFieldState;
//   const fieldState = getFieldState ? getFieldState(fieldContext.name, formState) : (formState || {});

//   const id = itemContext?.id ?? fallbackId;

//   return {
//     id,
//     name: fieldContext.name,
//     formItemId: `${id}-form-item`,
//     formDescriptionId: `${id}-form-item-description`,
//     formMessageId: `${id}-form-item-message`,
//     ...fieldState,
//   };
// }

// export function FormItem({ className, children, ...props }) {
//   const id = React.useId ? React.useId() : `formitem-${Math.random().toString(36).slice(2,9)}`;

//   return (
//     <FormItemContext.Provider value={{ id }}>
//       <div data-slot="form-item" className={cn("grid gap-2", className)} {...props}>
//         {children}
//       </div>
//     </FormItemContext.Provider>
//   );
// }

// export function FormLabel({ className, children, ...props }) {
//   const { error, formItemId } = useFormField();
//   return (
//     <Label data-slot="form-label" data-error={!!error} htmlFor={formItemId} className={cn("data-[error=true]:text-destructive", className)} {...props}>
//       {children}
//     </Label>
//   );
// }

// export function FormControl(props) {
//   const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
//   return (
//     <Slot
//       data-slot="form-control"
//       id={formItemId}
//       aria-invalid={!!error}
//       aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
//       {...props}
//     />
//   );
// }

// export function FormDescription({ className, children, ...props }) {
//   const { formDescriptionId } = useFormField();
//   return <p data-slot="form-description" id={formDescriptionId} className={cn("text-muted-foreground text-sm", className)} {...props}>{children}</p>;
// }

// export function FormMessage({ className, children, ...props }) {
//   const { error, formMessageId } = useFormField();
//   const body = error ? String(error?.message ?? "") : children;
//   if (!body) return null;
//   return <p data-slot="form-message" id={formMessageId} className={cn("text-destructive text-sm", className)} {...props}>{body}</p>;
// }
