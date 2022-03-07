import 'normalize.css'
import '@style/main.scss'
import '@common/request'
import '@common/form'
import { converterKeysObj } from '@common/keysToUpperCase'


// Многомерный объект для преобразования ключей в верхний регистр
const data = {
	key: '1.001',
	data: {
		id: '1',
		name: {
			lastName: 1,
			firstName: {
				father: 2,
				mother: 3
			}
		},
	},
	children1: {
		key: '2.001',
			data: {
			id: '1',
			name: 'qwe',
		}
	},
	children2: {
		key: '2.002',
			data: {
			id: '1',
				name: 'qwe',
		},
		children3: null,
	},
	children4: {
		key: '2.003',
			data: {
			id: '1',
			name: 'qwe',
		},
		children: null,
	},
	children5: {
		key: '1.002',
		data: {
			id: '1',
			name: 'qwe',
		},
		children6: null,
	},
	children7: {
		key: '1.003',
		data: {
			id: '1',
			name: 'qwe',
		},
		children8: null,
	},
	children9: {
		key: '1.004',
		data: {
			id: '1',
			name: 'qwe',
		},
		children10: {
			key: '1.005',
			data: {
				id: '1',
				name: 'qwe',
			},
			children11: null,
		},
		children12: {
			key: '1.006',
			data: {
				id: '1',
				name: 'qwe',
			},
			children13: null,
		},
	},
}

converterKeysObj(data)
