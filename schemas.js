const OPT = {
  place: ['居家生活','照顧機構','校園學習','職場就業','其他'],
  support: ['獨居','有同住者','有專業人力協助','偶有協助人力','經常有照顧者陪同','其他'],
  diagnosis: ['植物人','失智症','中風偏癱','脊髓損傷','腦外傷','小腦萎縮症','腦性麻痺','發展遲緩','運動神經元疾病','巴金森氏症','肌肉萎縮症','小兒麻痺','骨折','截肢','關節炎','心肺功能疾病','其他'],
  tubes: ['無','氣切管','鼻胃管','尿管','胃造口','腸造口','膀胱造口','其他'],
  source: ['政府補助-身障','政府補助-長照','政府補助-職災','政府補助-職再','政府補助-教育','政府補助-榮民','政府補助-健保','二手輔具-租借','二手輔具-媒合','自購','其他'],
  condition: ['已損壞不堪修復，需更新','規格或功能不符目前需求，需更換','適合繼續使用，但需另購置於不同場所','適合繼續使用，無需更換','其他'],
  yesno: ['是','否'],
  need: ['需要','不需要'],
  balance: ['良好','雙手扶持尚可維持平衡','雙手扶持難以維持平衡','需他人協助維持','完全依賴'],
  transfer: ['站起移位','站立式移位機','直接人力搬移','懸吊式移位機','坐姿平移','仰躺平移'],
  injuryGrade: ['第1級','第2級','第3級','第4級','無法分級','深層組織壓傷']
};

const f = (id,label,type='text',extra={}) => ({id,label,type,...extra});

const COMMON_SECTIONS = [
  {id:'basic',title:'一、基本資料',fields:[
    f('name','姓名','text',{required:true}), f('nationalId','身分證字號','text',{required:true}), f('birthDate','生日','date'),
    f('contactName','聯絡人姓名'), f('relationship','與個案關係'), f('phone','聯絡電話','tel'),
    f('householdAddress','戶籍地址','textarea'), f('sameResidence','居住地址同戶籍地','switch'), f('residenceAddress','居住地址','textarea'),
    f('mailAddressMode','聯絡／公文寄送地址','radio',{options:['同戶籍地','同居住地','另填']}), f('mailAddress','其他聯絡地址','textarea'),
    f('disabilityCertificate','是否領有身心障礙證明','radio',{options:['無','有']}),
    f('disabilityCategories','身心障礙類別','checkbox',{options:['第一類','第二類','第三類','第四類','第五類','第六類','第七類','第八類','其他']}),
    f('disabilityLevel','身心障礙程度分級','radio',{options:['輕度','中度','重度','極重度']})
  ]},
  {id:'clinical',title:'三、身體功能與構造－共通資料',fields:[
    f('diagnoses','輔具使用之相關診斷','checkbox',{options:OPT.diagnosis}), f('diagnosisNote','診斷補充說明','textarea'),
    f('tubes','管路／造口','checkbox',{options:OPT.tubes}), f('height','身高','number',{unit:'公分'}), f('weight','體重','number',{unit:'公斤'}),
    f('pressureInjury','壓傷狀況','radio',{options:['未曾發生','過去有','目前有']}), f('pressureLocation','壓傷部位'),
    f('pressureWidth','壓傷寬','number',{unit:'公分'}), f('pressureLength','壓傷長','number',{unit:'公分'}), f('pressureGrade','壓傷分級','select',{options:OPT.injuryGrade})
  ]},
  {id:'result',title:'四、評估結果',fields:[
    f('recommendation','評估結果','radio',{options:['建議使用','不建議使用'],required:true}), f('recommendedItem','建議／不建議之輔具'),
    f('reason','使用理由／不建議理由','textarea',{required:true}), f('training','是否需要接受使用訓練','radio',{options:OPT.need}),
    f('followup','是否需要安排追蹤時間','radio',{options:OPT.need}), f('resultOther','其他說明','textarea')
  ]},
  {id:'signoff',title:'評估單位與簽核資料',fields:[
    f('organization','評估單位','text',{required:true}), f('assessor','評估人員','text',{required:true}), f('title','職稱'), f('assessmentDate','評估日期','date',{required:true}),
    f('fitService','建議取得輔具後預約免費適配服務','switch'), f('fitServiceContact','適配服務聯絡方式'), f('otherAdvice','其他建議','textarea')
  ]}
];

const MODULES = {
  '01': {code:'01',title:'推車、輪椅、輪椅附加功能及配件',pages:6,sections:[
    {id:'context',title:'二、活動需求與情境評估',fields:[
      f('places','預計使用場合','checkbox',{options:OPT.place}), f('activities','活動需求','checkbox',{options:['室內靜態活動為主','社區／校園短距離移動','中長距離移動（>1公里）','運動休閒','其他']}),
      f('activityFrequency','活動頻率／類型'), f('environment','使用環境特性','checkbox',{options:['大致平坦','經常通過顛簸路面','跨越門檻／線槽','跨越間隙','無障礙坡道','陡坡','其他']}),
      f('thresholdHeight','門檻／線槽高低差','number',{unit:'公分'}), f('gapDistance','跨越間隙距離','number',{unit:'公分'}), f('support','人力支持情況','checkbox',{options:OPT.support}),
      f('transport','交通運輸方式','checkbox',{options:['無','公車／復康巴士載運','小客車載運','自駕改裝機車']}),
      f('currentDevice','目前輔具種類','checkbox',{options:['推車-一般型','推車-荷重型','推車-擺位型','輪椅-非輕量化量產型','輪椅-輕量化量產型','輪椅-客製型','手推圈啟動型動力輔助輪椅','附加利於移位','附加仰躺','附加空中傾倒','高活動型輪椅-基礎型','高活動型輪椅-進階型','後推式介護型動力套件']}),
      f('deviceSource','輔具來源','checkbox',{options:OPT.source}), f('yearsUsed','已使用年數','number',{unit:'年'}), f('currentCondition','使用情形','checkbox',{options:OPT.condition})
    ]},
    {id:'wheelchairBody',title:'三、輪椅相關身體評估',fields:[
      f('bodyType','體型概述'), f('lengthUnit','量測長度單位','radio',{options:['公分','英吋']}), f('hipLimitL','髖關節限制－左'), f('hipLimitR','髖關節限制－右'),
      f('kneeLimitL','膝關節限制－左'), f('kneeLimitR','膝關節限制－右'), f('seatWidest','坐面最寬處','number'), f('buttockToKnee','臀至膝窩','number'),
      f('kneeToFoot','膝窩至腳底','number'), f('scapulaHeight','肩胛下角高','number'), f('acromionHeight','肩峰高度','number'), f('occiputHeight','枕骨中心高','number'),
      f('chestWidth','胸廓寬度','number'), f('shoulderDistance','肩峰距離','number'), f('upperArmHeight','上臂垂直高','number'), f('chestDepth','胸廓厚度','number'),
      f('staticSitting','靜態坐姿維持能力','radio',{options:OPT.balance}), f('fallDirection','未扶持時倒向','checkbox',{options:['左側','右側','前方','後方']}),
      f('movingSitting','輪椅移動時坐姿維持能力','radio',{options:['良好','尚可維持平衡','需輔具加強軀幹支撐']}),
      f('posture','姿態／變形摘要','textarea'), f('tone','異常肌張力','radio',{options:['無','低張','高張','徐動']}), f('cognition','認知／判斷能力','radio',{options:['正常','尚可','錯亂或遲鈍']}),
      f('vision','視知覺能力','radio',{options:['正常','尚可','差']}), f('skinSensation','皮膚感覺','radio',{options:['正常','異常','喪失','無法施測']}), f('weightBearingTransfer','以下肢承重方式轉位能力','radio',{options:['可','否']})
    ]},
    {id:'wheelchairResult',title:'五、輪椅規格配置建議',fields:[
      f('subsidyItems','建議補助項目','checkbox',{options:['項次1 推車-一般型','項次2 推車-荷重型','項次3 推車-擺位型','項次4 輪椅-非輕量化量產型','項次5 輪椅-輕量化量產型','項次6 輪椅-客製型','項次7 利於移位功能','項次8 仰躺功能','項次9 空中傾倒功能','項次10 高活動型-基礎型','項次11 高活動型-進階型','項次12 手推圈啟動型動力輔助輪椅','項次13 後推式介護型動力套件','項次31 衝擊測試']}),
      f('operator','操作者','radio',{options:['完全由照顧者操作','主要由照顧者操作','個案獨立操作']}), f('frame','骨架形式','radio',{options:['固定式','折合式']}),
      f('seatWidth','建議座寬','number',{unit:'公分'}), f('seatDepth','建議座深','number',{unit:'公分'}), f('backHeight','建議椅背高','number',{unit:'公分'}), f('armHeight','建議扶手高','number',{unit:'公分'}),
      f('seatHeight','建議座面高','number',{unit:'公分'}), f('backAngle','座背夾角','number',{unit:'度'}), f('legAngle','腿靠角度','number',{unit:'度'}),
      f('mobilitySystem','輪椅移動系統建議','textarea'), f('seatingSystem','座椅系統建議','textarea'), f('positioning','擺位配件','checkbox',{options:['骨盆帶','軀幹固定帶','大腿環帶','小腿綁帶','腳掌綁帶','軀幹側支撐架','臀側支撐架','內收鞍板','分腿器','膝前擋板','桌板','防傾桿']}),
      f('configuration','完整規格配置建議','textarea',{required:true})
    ]}
  ]},
  '05': {code:'05',title:'步行輔具',pages:5,sections:[
    {id:'context',title:'二、活動需求與情境評估',fields:[
      f('places','預計使用場合','checkbox',{options:OPT.place}), f('activities','活動需求','checkbox',{options:['室內步行為主','社區／校園內移動','中長距離移動（>1公里）','運動休閒','其他']}),
      f('environment','使用環境特性','checkbox',{options:['室內','戶外','大致平坦','顛簸路面','上下樓梯','上下斜坡道','跨越門檻','其他']}), f('support','人力支持情況','checkbox',{options:OPT.support}),
      f('currentDevice','目前輔具種類','checkbox',{options:['單支拐杖-量產型','單支拐杖-客製型','助行器-一般型','助行器-輪管型或助起型（R型）','帶輪型助步車（助行椅）','姿勢控制型助行器','軀幹支撐型步態訓練器','其他']}),
      f('deviceSource','輔具來源','checkbox',{options:OPT.source}), f('yearsUsed','已使用年數','number',{unit:'年'}), f('currentCondition','使用情形','checkbox',{options:OPT.condition})
    ]},
    {id:'walkingBody',title:'三、步行功能評估',fields:[
      f('muscleTone','肌肉張力摘要','textarea'), f('jointRange','關節活動度摘要','textarea'), f('upperControl','上肢動作控制','textarea'),
      f('sittingBalance','坐姿平衡','radio',{options:OPT.balance}), f('sitToStand','坐到站','radio',{options:['不用手即可站起','用手協助站起','沒有協助無法站起']}),
      f('leftWeightBearing','左下肢承重能力','radio',{options:['全部體重','大於50%體重','小於50%體重','無法承重']}), f('rightWeightBearing','右下肢承重能力','radio',{options:['全部體重','大於50%體重','小於50%體重','無法承重']}),
      f('standingBalance','站姿平衡','radio',{options:['放手能維持站姿','扶持穩定物才能維持','無法自行維持']}), f('walkingAbility','上下樓梯／平地行走能力','textarea')
    ]},
    {id:'walkingSpec',title:'五、步行輔具規格配置',fields:[
      f('subsidyItems','建議補助項目','checkbox',{options:['項次42 單支拐杖-量產型','項次43 單支拐杖-客製型','項次44 助行器-一般型','項次45 助行器-輪管型或助起型','項次46 帶輪型助步車','項次47 姿勢控制型助行器','項次48 軀幹支撐型步態訓練器','EB01 單支拐杖-不鏽鋼製','EB02 單支拐杖-鋁製','EB03 助行器','EB04 帶輪型助步車']}),
      f('walkingAidType','輔具規格類型','checkbox',{options:['單點手杖','四腳拐杖','前臂拐杖','腋下拐杖','一般型助行器','輪管型助行器','帶輪型助步車','姿勢控制型助行器','軀幹支撐型步態訓練器']}),
      f('handHeight','站立手握持高度','number',{unit:'公分',hint:'建議以肘彎曲約20–30°、股骨大轉子或手腕關節線為參考。'}), f('forearmRingHeight','前臂拐杖肘環高度','number',{unit:'公分',hint:'肘環上緣約低於肘關節線2–3公分。'}),
      f('axillaryPadHeight','腋下拐杖胸廓靠墊高度','number',{unit:'公分',hint:'約低於腋下5公分，避免壓迫腋窩。'}), f('seatHeight','助步車座面高度','number',{unit:'公分'}),
      f('gaitPattern','建議步法','radio',{options:['擺至步法','擺過步法','三點步法','兩點步法','四點步法','其他']}), f('operationSide','建議操作手','radio',{options:['左','右','雙側']}),
      f('accessories','配件','checkbox',{options:['置物籃','手杖架','休憩時腳踏板','骨盆側支撐墊','骨盆懸吊帶／座墊','前臂支撐配件','踝足分隔配件','大腿分隔配件','其他']}),
      f('configuration','完整規格配置建議','textarea',{required:true})
    ]}
  ]},
  '06': {code:'06',title:'移位輔具及移位機',pages:4,sections:[
    {id:'context',title:'二、活動需求與情境評估',fields:[
      f('places','預計使用場合','checkbox',{options:OPT.place}), f('activities','活動需求','checkbox',{options:['個案獨立移位','由照顧者協助移位','其他']}), f('environment','使用環境特性','checkbox',{options:['需自地面移位','移位空間狹小','需跨越門檻','其他']}),
      f('support','人力支持情況','checkbox',{options:OPT.support}), f('currentDevice','目前輔具種類','checkbox',{options:['移位腰帶','移位轉盤','移位板','人力移位吊帶','移位滑布','躺式移位滑墊','人力型移位機','電動型移位機','其他']}),
      f('deviceSource','輔具來源','checkbox',{options:OPT.source}), f('yearsUsed','已使用年數','number',{unit:'年'}), f('currentCondition','使用情形','checkbox',{options:OPT.condition})
    ]},
    {id:'transferBody',title:'三、移位能力與環境配置',fields:[
      f('waist','腰圍','number',{unit:'公分'}), f('sittingBalance','坐姿平衡能力','radio',{options:OPT.balance}), f('standAbility','坐姿站起能力','radio',{options:['可獨立自行站起','輕度協助可站起','中度協助可站起','重度協助可站起','無法站起']}),
      f('bedTransfer','床上／床與輪椅移位方式','checkbox',{options:OPT.transfer}), f('bathTransfer','床／輪椅與沐浴椅或便盆椅移位方式','checkbox',{options:OPT.transfer}),
      f('clearPath','移位路徑淨空','radio',{options:['是','否','需改善']}), f('surfaceHeight','移位面高度','radio',{options:['接近','不接近','需更換床','需更換輪椅／沐浴椅']}), f('environmentNote','環境配置與策略','textarea')
    ]},
    {id:'transferSpec',title:'五、移位輔具規格配置',fields:[
      f('subsidyItems','建議補助項目','checkbox',{options:['項次49 移位腰帶','項次50 移位轉盤','項次51 移位板','項次52 人力移位吊帶','項次53 移位滑布','項次54 躺式移位滑墊','項次55 移位機-人力型','項次56 移位機-電動型','項次57 移位機吊帶','ED01','ED02','ED03','ED04','ED05','ED06','ED07','ED08']}),
      f('recommendedTransfer','建議轉位方式','checkbox',{options:OPT.transfer}), f('recommendedDevice','建議輔具','checkbox',{options:['移位腰帶','含胯下帶／大腿環帶','移位轉盤','站立式移位機','移位板','移位滑布','躺式移位滑墊','座椅型人力移位吊帶','仰躺型人力移位吊帶','懸吊式移位機']}),
      f('liftType','移位機種類','radio',{options:['移動式','壁掛式','軌道式']}), f('liftPower','升降動力來源','radio',{options:['人力','電動']}), f('slingType','吊帶／裝置型式','checkbox',{options:['坐式有頭部支撐','坐式無頭部支撐','如廁清潔型','其他']}),
      f('configuration','完整規格配置建議','textarea',{required:true})
    ]}
  ]},
  '16': {code:'16',title:'輪椅座墊',pages:6,sections:[
    {id:'context',title:'二、活動需求與情境評估',fields:[
      f('places','預計使用場合','checkbox',{options:OPT.place}), f('activities','活動需求','checkbox',{options:['預防壓傷','照護壓傷','有擺位需求','無擺位需求']}), f('environment','使用環境特性','checkbox',{options:['室內','戶外','居家使用','機構或學校','社區','職場','其他']}),
      f('support','人力支持情況','checkbox',{options:OPT.support}), f('currentDevice','目前座墊種類','checkbox',{options:['連通管氣囊-基礎型','連通管氣囊-橡膠材質基礎型','連通管氣囊-橡膠材質分區型','液態凝膠','固態凝膠','填充式氣囊','客製化適形泡棉','其他']}),
      f('deviceSource','輔具來源','checkbox',{options:OPT.source}), f('yearsUsed','已使用年數','number',{unit:'年'}), f('currentCondition','使用情形','checkbox',{options:OPT.condition})
    ]},
    {id:'cushionBody',title:'三、座墊相關功能評估',fields:[
      f('hipWidth','臀寬','number',{unit:'公分'}), f('buttockToKnee','臀至膝窩長','number',{unit:'公分'}), f('staticBalance','靜態坐姿平衡','radio',{options:OPT.balance}), f('dynamicBalance','動態坐姿平衡','radio',{options:['良好','不佳，需協助返回原坐姿']}),
      f('pelvis','骨盆姿態／變形','textarea'), f('spine','脊柱姿態／變形','textarea'), f('hipPosture','髖部姿態／變形','textarea'),
      f('pressureRelief','臀部減壓能力','checkbox',{options:['獨立撐起減壓','座椅姿勢／角度變換','身體重心偏移','無自主減壓能力或效率不彰']}),
      f('cushionOperation','座墊操作能力','textarea'), f('riskFactors','壓傷危險因子','checkbox',{options:['糖尿病','失禁','皮膚清潔不佳','皮膚經常潮濕','營養不良','臀部皮下組織不足','異常骨突','周邊血管病變','皮膚感染／疾病','經常性摩擦','皮膚感覺異常／喪失','無法自行減壓','其他']}),
      f('chairSize','配合座椅座寬×座深'), f('chairSurface','座椅支撐面','radio',{options:['硬板','布面']}), f('sittingDuration','常態性單次乘坐時間','radio',{options:['30分鐘以下','30分鐘到2小時','2小時以上']})
    ]},
    {id:'cushionSpec',title:'五、輪椅座墊規格配置',fields:[
      f('subsidyItems','建議補助項目','checkbox',{options:['項次114 連通管氣囊-基礎型','項次115 橡膠材質基礎型','項次116 橡膠材質分區型','項次117 液態凝膠','項次118 固態凝膠','項次119 填充式氣囊','項次120 客製化適形泡棉','EG03','EG04','EG05','EG06','EG07','EG08','EG09']}),
      f('cushionType','座墊類型','checkbox',{options:['連通管氣囊-基礎型','橡膠材質基礎型','橡膠材質分區型','液態凝膠','固態凝膠','填充式氣囊','客製化適形泡棉']}), f('mainLocation','主要使用地點','radio',{options:['室內','戶外','均需要']}), f('operator','主要操作者','radio',{options:['個案本身','照顧者','兩者皆要']}),
      f('strategy','使用方針','checkbox',{options:['均壓','減壓','擺位','消除剪力','微氣候調控']}), f('seatWidth','座寬','number',{unit:'公分'}), f('seatDepth','座深','number',{unit:'公分'}), f('cushionHeight','一般座墊高度','number',{unit:'公分'}),
      f('zoneHeights','特殊訂製九區高度（1–9依序）'), f('loadedZoneHeights','乘坐時九區受壓高度（1–9依序）'), f('cover','覆套','checkbox',{options:['彈性透氣','彈性防水','底部止滑','底部車縫黏扣帶']}), f('accessories','配件','checkbox',{options:['沉入式座板','底部穩定板']}),
      f('configuration','完整規格配置建議','textarea',{required:true})
    ]}
  ]},
  '17': {code:'17',title:'氣墊床及居家用照顧床',pages:5,sections:[
    {id:'context',title:'二、活動需求與情境評估',fields:[
      f('activities','活動需求','checkbox',{options:['氣墊床-預防壓傷','氣墊床-照護壓傷','照顧床-協助翻身','照顧床-協助坐起','照顧床-協助轉移位','照顧者護理','減壓','其他']}), f('environment','使用環境','radio',{options:['居家','非居家']}), f('support','人力支持情況','checkbox',{options:OPT.support}),
      f('currentMattress','目前床墊種類','checkbox',{options:['彈簧床墊','泡棉減壓床墊','乳膠床墊','固態凝膠床墊','氣墊床','其他']}), f('mattressHeight','床墊高度','number',{unit:'公分'}), f('mattressSource','床墊來源','checkbox',{options:OPT.source}), f('mattressCondition','床墊使用情形','checkbox',{options:OPT.condition}),
      f('currentBed','目前床架種類','checkbox',{options:['和式地板（無床架）','一般市售床','手動居家照顧床','電動居家照顧床','其他']}), f('bedHeight','床架高度','number',{unit:'公分'}), f('bedSource','床架來源','checkbox',{options:OPT.source}), f('bedCondition','床架使用情形','checkbox',{options:OPT.condition})
    ]},
    {id:'bedBody',title:'三、床面相關功能與空間評估',fields:[
      f('consciousness','意識狀態','radio',{options:['正常','嗜睡','錯亂或混亂','無明顯反應','其他']}), f('mental','心智功能','radio',{options:['正常','有精神／行為問題','其他']}), f('skinSensation','皮膚感覺','radio',{options:['正常','異常','喪失','無法施測']}), f('orthostatic','姿勢性低血壓','radio',{options:['有','無','未施測']}),
      f('stamina','目前體力狀態','radio',{options:['良好','尚可','不佳']}), f('staminaProgress','體力可能進展','radio',{options:['維持','進步','退化']}), f('jointRange','關節活動度','textarea'), f('controllerAbility','控制器操作能力','radio',{options:['獨立操作','需照顧者部分協助','照顧者協助操作']}), f('railAbility','護欄操作能力','radio',{options:['獨立操作','需照顧者部分協助','照顧者協助操作']}),
      f('turnAbility','翻身能力','textarea'), f('sitUpAbility','坐起能力','radio',{options:['可獨立輕易完成','執行費力耗時／需協助','完全依賴']}), f('transferAbility','轉位能力','radio',{options:['可獨立輕易完成','執行費力耗時／需協助','完全依賴']}),
      f('poplitealHeight','個案膝窩高','number',{unit:'公分'}), f('shoulderWidth','肩寬','number',{unit:'公分'}), f('caregiverHeight','主要照顧者身高','number',{unit:'公分'}), f('careHeight','適合照顧高度','number',{unit:'公分'}),
      f('bedSpaceLength','床擺放空間－長','number',{unit:'公分'}), f('bedSpaceWidth','床擺放空間－寬','number',{unit:'公分',hint:'一般床體與操作空間常需約220×100公分，仍應依現場與產品規格確認。'}), f('transferSpace','床邊轉移位空間'),
      f('riskFactors','壓傷危險因子','checkbox',{options:['糖尿病','失禁','皮膚清潔不佳','皮膚經常潮濕','營養不良','骨突處皮下組織不足','異常骨突','周邊血管病變','皮膚感染／疾病','經常性摩擦','皮膚感覺異常／喪失','無法自行減壓','其他']})
    ]},
    {id:'bedSpec',title:'五、氣墊床／照顧床規格配置',fields:[
      f('subsidyItems','建議補助項目','checkbox',{options:['項次121 氣墊床-基礎型','項次122 氣墊床-進階型','項次123 居家用照顧床','項次124 背靠段及腿段獨立抬升（電動）','項次125 床板高度手動調整','項次126 床板高度電動調整','項次127 高升降行程電動調整','EG01','EG02','EH01','EH02','EH03']}),
      f('airMattressType','氣墊床類型','radio',{options:['基礎型','進階型','不建議']}), f('advancedFunctions','進階型功能','checkbox',{options:['模擬30度翻身／2層管／側邊護欄','利於坐姿移位之邊框','壓力感應數位幫浦','氣囊總高度20公分以上']}),
      f('bedFunctions','照顧床功能','checkbox',{options:['居家用照顧床','背靠段及腿段獨立抬升','高度手動調整','高度電動調整','高升降行程電動調整']}), f('bedSize','床架尺寸','radio',{options:['一般尺寸','特製尺寸']}), f('innerLength','頭尾板內緣長','number',{unit:'公分'}), f('innerWidth','護欄內緣寬','number',{unit:'公分'}), f('minHeight','最低高度','number',{unit:'公分'}), f('maxHeight','最高高度','number',{unit:'公分'}),
      f('base','底座形式','radio',{options:['無輪','附輪']}), f('operator','主要操作者','radio',{options:['個案本身','照顧者','兩者皆要']}), f('controller','控制器規格','radio',{options:['一般款式','遙控器加大按鈕','其他改良']}), f('leftRail','左側護欄','select',{options:['全開式','雙開式','快拆柵欄式','外掀助起式','其他']}), f('rightRail','右側護欄','select',{options:['全開式','雙開式','快拆柵欄式','外掀助起式','其他']}),
      f('airMattressThickness','搭配氣墊床厚度','number',{unit:'公分'}), f('bedMattressThickness','建議照顧床床墊厚度上限','number',{unit:'公分'}), f('accessories','其他配件','checkbox',{options:['電動床桌板','點滴架','其他']}), f('configuration','完整規格配置建議','textarea',{required:true})
    ]}
  ]}
};

for (const module of Object.values(MODULES)) {
  module.sections = [COMMON_SECTIONS[0], ...module.sections.slice(0,1), COMMON_SECTIONS[1], ...module.sections.slice(1), COMMON_SECTIONS[2], COMMON_SECTIONS[3]];
}

window.APP_SCHEMAS = MODULES;
