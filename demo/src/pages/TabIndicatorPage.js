/**
 * Created by tangzhibin on 16/3/24.
 */

'use strict'

import React, { useState } from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native'
import { IndicatorViewPager, PagerTabIndicator } from '@jeison.berdugo.glooko/rn-viewpager'
import { SquarePagerView, TrianglePagerView, CirclePagerView } from '../components/PagerItemView'

const TabIndicatorPage = () => {
    const [bgColor, setBgColor] = useState(new Animated.Value(0));
    const [viewPager, setViewPager] = useState(null);
    let _setBgColor = Animated.event([{bgColor: bgColor}],{useNativeDriver: false});
    let _bgColor = bgColor.interpolate({
        inputRange: [0, 1, 2],
        outputRange: ['hsl(187, 74%, 47%)', 'hsl(89, 47%, 54%)', 'hsl(12, 97%, 59%)']
    })
    
    function _onPageScroll(scrollData) {
        let {offset, position} = scrollData
        if (position < 0 || position >= 2) return
        _setBgColor({bgColor: offset + position})
    }

    function _renderTabIndicator() {
        let tabs = [
            {
                text: 'SQUARE',
                iconSource: require('../imgs/ic_tab_square.png'),
                selectedIconSource: require('../imgs/ic_tab_square_slct.png')
            },
            {
                text: 'CIRCLE',
                iconSource: require('../imgs/ic_tab_circle.png'),
                selectedIconSource: require('../imgs/ic_tab_circle_slct.png')
            },
            {
                text: 'TRIANGLE',
                iconSource: require('../imgs/ic_tab_triangle.png'),
                selectedIconSource: require('../imgs/ic_tab_triangle_slct.png')
            }
        ]
        return (
            <PagerTabIndicator
                style={styles.indicatorContainer}
                ref={viewPagerRef => {
                    setViewPager(viewPagerRef);
                }}
                iconStyle={styles.tabIcon}
                selectedIconStyle={styles.selectedTabIcon}
                textStyle={styles.tabTxt}
                selectedTextStyle={styles.selectedTabTxt}
                itemStyle={styles.tabItem}
                selectedItemStyle={styles.selectedTabItem}
                tabs={tabs}
            />
        )
    }

    return (
        <Animated.View style={{flex: 1, backgroundColor: _bgColor}} >
            <IndicatorViewPager
                style={{flex: 1}}
                indicator={_renderTabIndicator()}
                onPageScroll={_onPageScroll}
                scrollEnabled={false}
                initialPage={1}
            >
                {SquarePagerView()}
                {CirclePagerView()}
                {TrianglePagerView()}
            </IndicatorViewPager>
        </Animated.View>
    )
}

export default TabIndicatorPage;

const styles = StyleSheet.create({
    indicatorContainer: {
        backgroundColor: 0xFFFFFFFF,
        borderTopWidth: 0,
        height: 56,
        paddingTop: 0,
        paddingBottom: 0
    },
    tabIcon: {
        width: 20,
        height: 20,
        tintColor: '#7F8C8D',
        resizeMode: 'contain'
    },
    selectedTabIcon: {
        width: 20,
        height: 20,
        tintColor: '#2C3E50',
        resizeMode: 'contain'
    },
    tabTxt: {
        color: '#34495E',
        marginTop: 0,
        fontSize: 10.5
    },
    selectedTabTxt: {
        color: '#2C3E50',
        marginTop: 0,
        fontSize: 12
    },
    tabItem: {
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 8
    },
    selectedTabItem: {
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 6
    }

})