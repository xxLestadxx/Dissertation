#!/bin/bash 
 composer transaction submit --card TB@ring -d '{"$class":"org.ring.passTheToken","holder":"resource:org.ring.Trader#TA","token":"resource:org.ring.Token#EMA"}' 