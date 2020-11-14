const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const getData = async (url) => {
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json
    }
    catch (error) {
        console.log(error)
    }
}

router.get('/', async (req, res) => {
    res.redirect('/users/1/album')
})

router.get('/:id/album', async (req, res) => {
    let userId = req.params.id
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    if (!page) {
        page = 1
    }
    if (!limit) {
        limit = 5
    }
    let data = await getData("https://jsonplaceholder.typicode.com/albums")
    let userIds = []
    data.forEach((d) => {
        if (!userIds.includes(d.userId)) {
            userIds.push(d.userId)
        }
    })
    //console.log(userIds)
    //console.log('data', data)

    if (!userId) {
        userId = 1
    }
    let userData = []
    data.forEach((d) => {
        if (d.userId == userId) {
            userData.push(d)
        }
    })
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < userData.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    results.page = page
    results.limit = limit
    results.userId = userId

    let len = userData.length
    let numOfButtons = Math.ceil(len / 5)
    results.numOfButtons = numOfButtons

    //console.log(res.paginatedResults)
    results.results = userData.slice(startIndex, endIndex)
    res.paginatedResults = results
    res.render('users/index', {
        paginatedResults: res.paginatedResults,
        userIds: userIds
    })
})

router.post('/:id/album', async (req, res) => {
    let newTitle = req.body.title
    let newAlbumPhoto = "https://via.placeholder.com/100"
    let userId = req.params.id
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)

    if (!limit) {
        limit = 5
    }
    let data = await getData("https://jsonplaceholder.typicode.com/albums")
    let userIds = []
    data.forEach((d) => {
        if (!userIds.includes(d.userId)) {
            userIds.push(d.userId)
        }
    })
    //console.log(userIds)
    //console.log('data', data)

    let userData = []
    data.forEach((d) => {
        if (d.userId == userId) {
            userData.push(d)
        }
    })
    userData.push({ userId: userId, id: userData[userData.length - 1].id + 1, title: newTitle })

    let len = userData.length
    let numOfButtons = Math.ceil(len / 5)

    const startIndex = (numOfButtons - 1) * limit
    const endIndex = numOfButtons * limit
    const results = {}
    results.numOfButtons = numOfButtons

    results.page = numOfButtons
    results.limit = limit
    results.userId = userId

    if (endIndex < userData.length) {
        results.next = {
            page: numOfButtons + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: numOfButtons - 1,
            limit: limit
        }
    }

    //console.log(res.paginatedResults)
    results.results = userData.slice(startIndex, endIndex)
    res.paginatedResults = results
    res.render('users/index', {
        paginatedResults: res.paginatedResults,
        userIds: userIds
    })
})

router.put('/:id/album/:photoId', async (req, res) => {
    let userId = req.params.id
    let photoId = req.params.photoId
    let updatedTitle = req.body.title
    
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    
    if (!limit) {
        limit = 5
    }
    let data = await getData("https://jsonplaceholder.typicode.com/albums")
    let userIds = []
    data.forEach((d) => {
        if (!userIds.includes(d.userId)) {
            userIds.push(d.userId)
        }
    })
    //console.log(userIds)
    //console.log('data', data)
    let updateItemPosition = null
    let userData = []
    data.forEach((d) => {
        if (d.userId == userId) {
            userData.push(d)
        }
        if (d.id == photoId) {
            updateItemPosition = userData.indexOf(d)
        }
    })
    let count = 1
    while (updateItemPosition >= 5 * count) {
        count++
    }
    page = count 
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == photoId) {
            userData[i].title = updatedTitle
        }
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < userData.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    results.page = page
    results.limit = limit
    results.userId = userId

    let len = userData.length
    let numOfButtons = Math.ceil(len / 5)
    results.numOfButtons = numOfButtons

    //console.log(res.paginatedResults)
    results.results = userData.slice(startIndex, endIndex)
    res.paginatedResults = results
    res.render('users/index', {
        paginatedResults: res.paginatedResults,
        userIds: userIds
    })
})

router.delete('/:id/album/:photoId', async (req, res) => {
    let userId = req.params.id
    let photoId = req.params.photoId
    
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    
    if (!limit) {
        limit = 5
    }
    let data = await getData("https://jsonplaceholder.typicode.com/albums")
    let userIds = []
    data.forEach((d) => {
        if (!userIds.includes(d.userId)) {
            userIds.push(d.userId)
        }
    })
    //console.log(userIds)
    //console.log('data', data)
    let deleteItemPosition = null
    let userData = []
    data.forEach((d) => {
        if (d.userId == userId) {
            userData.push(d)
        }
        if (d.id == photoId) {
            deleteItemPosition = userData.indexOf(d)
        }
    })
    let count = 1
    while (deleteItemPosition >= 5 * count) {
        count++
    }
    page = count 
    let filteredUserData = userData.filter((d) => {
        return d.id != photoId
    })

    let tempIndex = (page - 1) * 5
    if (!filteredUserData[tempIndex]) {
        page = page - 1
    }
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < filteredUserData.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }

    results.page = page
    results.limit = limit
    results.userId = userId

    let len = filteredUserData.length
    let numOfButtons = Math.ceil(len / 5)
    results.numOfButtons = numOfButtons

    //console.log(res.paginatedResults)
    results.results = filteredUserData.slice(startIndex, endIndex)
    res.paginatedResults = results
    res.render('users/index', {
        paginatedResults: res.paginatedResults,
        userIds: userIds
    })
})



module.exports = router