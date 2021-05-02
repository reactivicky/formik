import React from 'react'
import { Formik, Field, Form, useField, FieldArray } from 'formik'
import {
	TextField,
	Button,
	Checkbox,
	Radio,
	FormControlLabel,
	Select,
	MenuItem
} from '@material-ui/core'
import * as yup from 'yup'

const MyRadio = ({ label, ...props }) => {
	const [field] = useField(props)
	return <FormControlLabel {...field} control={<Radio />} label={label} />
}

const MyTextField = ({ placeholder, ...props }) => {
	const [field, meta] = useField(props)
	const errorText = meta.error && meta.touched ? meta.error : ''
	return (
		<TextField
			placeholder={placeholder}
			{...field}
			helperText={errorText}
			error={!!errorText}
		/>
	)
}

const validationSchema = yup.object({
	firstName: yup
		.string()
		.required()
		.max(10),
	pets: yup.array().of(
		yup.object({
			name: yup.string().required()
		})
	)
})

function App() {
	return (
		<div>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					tall: false,
					cookies: [],
					yoghurt: '',
					pets: [{ type: 'cat', name: 'jarvis', id: '' + Math.random() }]
				}}
				validationSchema={validationSchema}
				// validate={values => {
				// 	const errors = {}

				// 	if (values.firstName.includes('bob')) {
				// 		errors.firstName = 'no bob'
				// 	}

				// 	return errors
				// }}
				onSubmit={(data, { setSubmitting, resetForm }) => {
					setSubmitting(true)
					// make async call
					console.log(data)
					setSubmitting(false)
					resetForm()
				}}
			>
				{({ values, errors, isSubmitting }) => (
					<Form>
						<MyTextField placeholder='first name' name='firstName' />
						<div>
							<Field
								placeholder='last name'
								name='lastName'
								type='text'
								as={TextField}
							/>
						</div>
						<Field name='tall' type='checkbox' as={Checkbox} />
						<div>cookies:</div>
						<Field
							name='cookies'
							type='checkbox'
							as={Checkbox}
							value='chocolate chip'
						/>
						<Field
							name='cookies'
							type='checkbox'
							as={Checkbox}
							value='snicker doodle'
						/>
						<Field name='cookies' type='checkbox' as={Checkbox} value='sugar' />
						<div>yogurt</div>
						<MyRadio name='yoghurt' type='radio' value='peach' label='peach' />
						<MyRadio
							name='yoghurt'
							type='radio'
							value='blueberry'
							label='blueberry'
						/>
						<MyRadio name='yoghurt' type='radio' value='apple' label='apple' />
						<FieldArray name='pets'>
							{arrayHelpers => (
								<div>
									<Button
										onClick={() =>
											arrayHelpers.push({
												type: 'frog',
												name: '',
												id: '' + Math.random()
											})
										}
									>
										Add Pet
									</Button>
									{values.pets.map((pet, index) => {
										return (
											<div key={pet.id}>
												<MyTextField
													placeholder='pet name'
													name={`pets.${index}.name`}
												/>
												<Field
													name={`pets.${index}.type`}
													type='select'
													as={Select}
												>
													<MenuItem value='cat'>cat</MenuItem>
													<MenuItem value='dog'>dog</MenuItem>
													<MenuItem value='frog'>frog</MenuItem>
												</Field>
												<Button onClick={() => arrayHelpers.remove(index)}>
													X
												</Button>
											</div>
										)
									})}
								</div>
							)}
						</FieldArray>
						<div>
							<Button disabled={isSubmitting} type='submit'>
								Submit
							</Button>
						</div>

						<pre>{JSON.stringify(values, null, 2)}</pre>
						<pre>{JSON.stringify(errors, null, 2)}</pre>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default App
